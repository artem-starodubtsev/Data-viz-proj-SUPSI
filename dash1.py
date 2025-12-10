from flask import Flask
from dash import Dash, dcc, html, Input, Output
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import copy

ANIMATION_DURATION_MS = 1000

# -----------------------------
# Shared HTML template
# -----------------------------
INDEX_STRING = """
<!DOCTYPE html>
<html>
    <head>
        {%metas%}
        <title>{%title%}</title>
        {%favicon%}
        {%css%}
        <style>
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden; /* <-- no scrollbars in Dash page */
        }
        </style>
    </head>
    <body>
        {%app_entry%}
        <footer>
            {%config%}
            {%scripts%}
            {%renderer%}
        </footer>
    </body>
</html>
"""

# -----------------------------
# Load + prep data (shared)
# -----------------------------
df = pd.read_excel("data/data.xlsx")

df = df[df["Entity"] != "World"]
df = df[df["Entity"].isin(set(df.loc[df["Year"] == 2018, "Entity"]))]

# -----------------------------
# App 1 figure (your bubble chart)
# -----------------------------
fig_bubbles = px.scatter(
    df,
    y="gdp",
    x="Cost of a healthy diet",
    size="population",
    color="Entity",
    animation_frame="Year",
    animation_group="Entity",
    hover_name="Entity",
    size_max=60,
    log_y=True,
    labels={
        "gdp": "GDP per capita",
        "Cost of a healthy diet": "Cost of a healthy diet",
        "population": "Population",
    },
    title="Cost of a Healthy Diet vs GDP over Time",
    range_x=[0, 8],
)

fig_bubbles.update_layout(
    template="plotly_white",
    yaxis_title="GDP per capita (log scale)",
    xaxis_title="Cost of a healthy diet",
    margin=dict(l=0, r=0, t=40, b=0),
)

if fig_bubbles.layout.updatemenus and fig_bubbles.layout.sliders:
    fig_bubbles.layout.updatemenus[0].buttons[0].args[1]["frame"]["duration"] = ANIMATION_DURATION_MS * 2
    fig_bubbles.layout.updatemenus[0].buttons[0].args[1]["transition"]["duration"] = ANIMATION_DURATION_MS
    fig_bubbles.layout.sliders[0]["transition"]["duration"] = ANIMATION_DURATION_MS

# -----------------------------
# App 2 figure (animated map)
# -----------------------------
fig_map = px.choropleth(
    df,
    locations="Entity",
    locationmode="country names",
    color="Cost of a healthy diet",
    hover_name="Entity",
    animation_frame="Year",
    range_color=[0, 8],
    color_continuous_scale="Viridis",
    projection="mercator",
    labels={"Cost of a healthy diet": "Cost of a healthy diet"},
    title="Cost of a Healthy Diet (World Map)",
)

fig_map.update_layout(
    template="plotly_white",
    margin=dict(l=0, r=0, t=40, b=0),
)

if fig_map.layout.updatemenus and fig_map.layout.sliders:
    fig_map.layout.updatemenus[0].buttons[0].args[1]["frame"]["duration"] = ANIMATION_DURATION_MS * 2
    fig_map.layout.updatemenus[0].buttons[0].args[1]["transition"]["duration"] = ANIMATION_DURATION_MS
    fig_map.layout.sliders[0]["transition"]["duration"] = ANIMATION_DURATION_MS

# -----------------------------
# Flask server + 2 mounted apps
# -----------------------------
server = Flask(__name__)

app1 = Dash(__name__, server=server, url_base_pathname="/app1/")
app1.index_string = INDEX_STRING

app2 = Dash(
    __name__,
    server=server,
    url_base_pathname="/app2/",
    assets_folder="assets",       # ensure this path exists next to your .py
    assets_url_path="assets"
)
app2.index_string = INDEX_STRING

# Regions for smooth "zoom" (Geo projection scale)
REGIONS = {
    "World":    {"lat": 10, "lon": 0,   "scale": 1.0},
    "Europe":   {"lat": 54, "lon": 15,  "scale": 3.2},
    "Africa":   {"lat": 2,  "lon": 20,  "scale": 2.6},
    "Asia":     {"lat": 35, "lon": 90,  "scale": 2.4},
    "Americas": {"lat": 10, "lon": -75, "scale": 2.2},
}

# -----------------------------
# App 1 layout
# -----------------------------
app1.layout = html.Div(
    style={
        "height": "100vh",
        "width": "100vw",
        "margin": 0,
        "padding": 0,
        "display": "flex",
        "flexDirection": "column",
    },
    children=[
        html.H1(
            "Cost of a Healthy Diet vs GDP",
            style={"textAlign": "center", "margin": "8px 0"},
        ),
        html.Div(
            style={"flex": "1", "minHeight": 0},
            children=dcc.Graph(
                id="diet-gdp-bubbles",
                figure=fig_bubbles,
                style={"height": "100%", "width": "100%"},
                config={"displayModeBar": True},
                # IMPORTANT:
                # This figure already has Plotly Express frames.
                # Let Plotly's own slider/play control handle animation.
                animate=False,
            ),
        )
    ],
)

# -----------------------------
# App 2 layout
# -----------------------------
app2.layout = html.Div(
    style={
        "height": "100vh",
        "width": "100vw",
        "margin": 0,
        "padding": 0,
        "display": "flex",
        "flexDirection": "column",
        "gap": "4px",
    },
    children=[
        # Store + Interval for React -> Dash bridge
        dcc.Store(id="region-store", data="World"),
        dcc.Interval(id="region-poll", interval=200, n_intervals=0),

        html.H1(
            "Cost of a Healthy Diet — World Map",
            style={
                "textAlign": "center",
                "margin": "4px 0",
                "fontSize": "20px",
                "lineHeight": "1.1",
            },
        ),

        # Square frame
        html.Div(
            style={
                "flex": "1",
                "minHeight": 0,
                "display": "flex",
                "justifyContent": "center",
                "alignItems": "center",
                "padding": "4px",
            },
            children=[
                html.Div(
                    style={
                        "width": "min(92vh, 98vw)",
                        "aspectRatio": "1 / 1",
                    },
                    children=dcc.Graph(
                        id="diet-map",
                        figure=fig_map,
                        style={"height": "100%", "width": "100%"},
                        config={"displayModeBar": True, "responsive": True},
                        # IMPORTANT:
                        # This figure already has Plotly Express frames.
                        # Turning Dash animate on can prevent layout/geo updates from showing.
                        animate=False,
                    ),
                )
            ],
        )
    ],
)

# -----------------------------
# React -> Dash bridge:
# Read window.__DASH_REGION__ into region-store
# -----------------------------
app2.clientside_callback(
    """
    function(n) {
        const current = window.__DASH_REGION__ || "World";
        window.__LAST_DASH_REGION__ = window.__LAST_DASH_REGION__ || null;

        if (current === window.__LAST_DASH_REGION__) {
            return window.dash_clientside.no_update;
        }

        window.__LAST_DASH_REGION__ = current;
        return current;
    }
    """,
    Output("region-store", "data"),
    Input("region-poll", "n_intervals"),
)

# -----------------------------
# Update map view when region changes
# -----------------------------
@app2.callback(
    Output("diet-map", "figure"),
    Input("region-store", "data"),
)
def zoom_map(region):
    r = REGIONS.get(region, REGIONS["World"])
    fig = copy.deepcopy(fig_map)

    # Build an explicit geo update object.
    # Using projection dict is more reliable with animated (framed) px figures.
    geo_update = dict(
        center={"lat": r["lat"], "lon": r["lon"]},
        projection=dict(type="mercator", scale=r["scale"]),
    )

    # Update base layout
    fig.update_layout(geo=geo_update)

    # Update every frame too (critical for px animation figures)
    if fig.frames:
        for fr in fig.frames:
            if fr.layout is None:
                fr.layout = go.Layout()
            fr.layout.update(geo=geo_update)

    return fig

# Optional: simple root landing page
@server.route("/")
def index():
    return """
    <h2>Dash Apps</h2>
    <ul>
        <li><a href="/app1/">Bubble chart: Cost vs GDP</a></li>
        <li><a href="/app2/">Animated map: Cost of healthy diet</a></li>
    </ul>
    """

# -----------------------------
# Run
# -----------------------------
if __name__ == "__main__":
    server.run(host="0.0.0.0", port=8050, debug=True)
