import numpy as np
from flask import Flask
from dash import Dash, dcc, html, Input, Output
import plotly.express as px
from plotly.subplots import make_subplots
import plotly.graph_objects as go
import pandas as pd
import copy
import os
from flask import send_from_directory, abort

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

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
#df = pd.read_csv("data/data.csv")
df = pd.read_csv("data/data_filled_neighbors.csv")

df = df.drop(
    columns=["is_imputed", "imputed_from", "row_added", "values_imputed"],
    errors="ignore",   # <- prevents KeyError if a column isn't present
)



# print(df['Region'].unique())

countries_to_label = ["Switzerland", "United States", "India", "China"]

df = df[df["Entity"] != "World"]
df = df[df["Entity"].isin(set(df.loc[df["Year"] == 2018, "Entity"]))]

df.dropna(inplace=True)

df['log_population'] = np.pow(np.log2(df['population']), 13)

df2 = df.copy()
df2["label"] = df2["Entity"].where(df2["Entity"].isin(countries_to_label), "")

REGION_COLORS = {
    "Europe": "#4477AA",
    "Africa": "#EE6677",
    "America": "#66CCEE",
    "Asia": "#228833",
    "Oceania": "#AA3377",
}
# -----------------------------
# App 1 figure (your bubble chart)
# -----------------------------
fig_bubbles = px.scatter(
    df2,
    x="gdp",
    y="bmi",
    size="log_population",
    color="Region",
    color_discrete_map=REGION_COLORS,
    animation_frame="Year",
    animation_group="Entity",
    hover_name="Entity",
hover_data={
        "population": True,        # hide raw if you want
        "log_population": False,    # hide size metric if you want
        "gdp": ":,.0f",
        "bmi": ":.1f",
        "Year": True,
        "Region": True,
    },
    text="label",  # <-- labels only for selected countries
    size_max=80,
    log_x=True,
    #title="BMI vs GDP over Time",
    range_y=[-5, 50],
)

fig_bubbles.add_hrect(
    y0=30, y1=50,               # match your range_y upper bound
    fillcolor="rgba(255, 0, 0, 0.09)",  # pick any color/opacity
    line_width=0,
    layer="below"               # keep it behind bubbles
)

roboto = "Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif"

fig_bubbles.update_traces(
    textposition="middle center",
    textfont=dict(size=16),
    cliponaxis=False,  # lets labels render outside axes
)

fig_bubbles.update_xaxes(
    dtick=1,  # 10^n only (1, 10, 100, 1000, ...)
    minor=dict(ticks="", showgrid=False),  # hide any minor ticks/grid (Plotly >=5.8)
)

fig_bubbles.update_layout(
    font=dict(
        family="roboto",  # any CSS font stack
        size=14,
        # color="black",  # optional
    ),
    title=dict(
        font=dict(size=20)  # optional override
    ),
)

fig_bubbles.update_traces(
    hovertemplate=fig_bubbles.data[0].hovertemplate.replace(
        "population=", "Population="
    )
)

fig_bubbles.update_layout(font=dict(family=roboto))

fig_bubbles.update_layout(
    template="plotly_white",
    xaxis_title="GDP per capita (log scale)",
    yaxis_title="BMI",
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
    #range_color=[0, 8],
    color_continuous_scale="Viridis",
    projection="mercator",
    labels={"Cost of a healthy diet": "Cost of a healthy diet"},
    #title="Cost of a Healthy Diet (World Map)",
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
    assets_folder="assets",  # ensure this path exists next to your .py
    assets_url_path="assets"
)
app2.index_string = INDEX_STRING

ADD_SCALE = 1.5

REGIONS = {
    "World": {"lat": 10, "lon": 0, "scale": 1.0},

    "Europe": {"lat": 54, "lon": 15, "scale": 3.2 * ADD_SCALE},
    "Africa": {"lat": 2, "lon": 20, "scale": 2.6 * ADD_SCALE},
    "Asia": {"lat": 35, "lon": 90, "scale": 2.2 * ADD_SCALE},
    "Oceania": {"lat": -22, "lon": 133, "scale": 2.6 * ADD_SCALE},

    "America": {"lat": 20, "lon": -90, "scale": 1.35 * ADD_SCALE},

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
        "fontFamily": roboto,
    },
    children=[
        # html.H1(
        #     "BMI vs GDP",
        #     style={"textAlign": "center", "margin": "8px 0"},
        # ),
        html.Div(
            style={"flex": "1", "minHeight": 0},
            children=dcc.Graph(
                id="diet-gdp-bubbles",
                figure=fig_bubbles,
                style={"height": "100%", "width": "100%"},
                config={"displayModeBar": False},
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
        "fontFamily": roboto,
    },
    children=[
        dcc.Store(id="region-store", data="World"),
        dcc.Interval(id="region-poll", interval=200, n_intervals=0),

        html.Div(
            style={"flex": "1", "minHeight": 0},  # <-- THIS is the key
            children=dcc.Graph(
                id="diet-map",
                figure=fig_map,
                style={"height": "100%", "width": "100%"},  # <-- fill available height
                config={"displayModeBar": False, "responsive": True},
                animate=False,
            ),
        ),
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

REGION_COLORS_LIGHT = {
    "Europe": "#B4C9DD",
    "Africa": "#F8C2C9",
    "America": "#C2EBF8",
    "Asia": "#A7CFAD",
    "Oceania": "#DDADC9",
}

def make_map(dataframe, region):
    # pick colorscale
    if region == "World":
        colorscale = "Viridis"
    else:
        base = REGION_COLORS.get(region, "#636EFA")
        light = REGION_COLORS_LIGHT.get(region, "#F8C2C9")
        # light -> base (you can tweak the light end)
        colorscale = [
            [0.0, light],
            [1.0, base],
        ]

    fig = px.choropleth(
        dataframe,
        locations="Entity",
        locationmode="country names",
        color="Cost of a healthy diet",
        hover_name="Entity",
        animation_frame="Year",
        range_color=[2, 8],
        color_continuous_scale=colorscale,
        projection="mercator",
        labels={"Cost of a healthy diet": "Cost of a healthy diet"},
        #title="Cost of a Healthy Diet (World Map)",
    )

    fig.update_layout(coloraxis_colorbar=dict(title=""))

    fig.update_coloraxes(
        colorbar_title_text="$ per day for healthy diet",
        colorbar_title_side="right",
    )

    fig.update_layout(template="plotly_white", margin=dict(l=0, r=0, t=40, b=0))

    fig.update_layout(font=dict(family=roboto))

    if fig.layout.updatemenus and fig.layout.sliders:
        fig.layout.updatemenus[0].buttons[0].args[1]["frame"]["duration"] = ANIMATION_DURATION_MS * 2
        fig.layout.updatemenus[0].buttons[0].args[1]["transition"]["duration"] = ANIMATION_DURATION_MS
        fig.layout.sliders[0]["transition"]["duration"] = ANIMATION_DURATION_MS

    return fig


@app2.callback(Output("diet-map", "figure"), Input("region-store", "data"))
def zoom_map(region):
    r = REGIONS.get(region, REGIONS["World"])

    df_region = df if region == "World" else df[df["Region"] == region]
    fig = make_map(df_region, region)

    geo_update = dict(
        center={"lat": r["lat"], "lon": r["lon"]},
        projection=dict(type="mercator", scale=r["scale"]),
    )

    fig.update_layout(geo=geo_update)

    if fig.frames:
        for fr in fig.frames:
            if fr.layout is None:
                fr.layout = go.Layout()
            fr.layout.update(geo=geo_update)

    return fig

# -----------------------------
# App 3 (independent): line chart from obesity.csv (by Region)
# -----------------------------
df_ob = pd.read_csv("data/obesity.csv")   # <- put obesity.csv in your data/ folder

# detect the metric column automatically (the non-Entity/Code/Year column)
metric_col = [c for c in df_ob.columns if c not in ["Entity", "Code", "Year"]][0]
metric_label = metric_col  # keep original for axis label

# bring Regions (only mapping, not mixing metrics)
region_map = df[["Entity", "Region"]].drop_duplicates()
df_ob = df_ob.merge(region_map, on="Entity", how="left")

# clean
df_ob = df_ob[df_ob["Entity"] != "World"]
df_ob = df_ob.dropna(subset=["Region", metric_col])

# OPTIONAL: limit years if you want (delete these 2 lines if not needed)
df_ob = df_ob[df_ob["Year"].between(2017, 2023)]


# aggregate to region-level (simple mean; change to weighted if you want)
df_ob_region = (
    df_ob.groupby(["Region", "Year"], as_index=False)[metric_col]
    .mean()
)

fig_line = px.line(
    df_ob_region,
    x="Year",
    y=metric_col,
    color="Region",
    color_discrete_map=REGION_COLORS,
    markers=True,
    labels={metric_col: metric_label},
)

fig_line.update_yaxes(title_text="% of adults with obesity")

fig_line.update_layout(
    template="plotly_white",
    margin=dict(l=0, r=0, t=40, b=0),
    font=dict(family=roboto, size=14),
)
fig_line.update_xaxes(dtick=1)
fig_line.update_yaxes(title_text=metric_label)

app3 = Dash(__name__, server=server, url_base_pathname="/app3/")
app3.index_string = INDEX_STRING

app3.layout = html.Div(
    style={
        "height": "100vh",
        "width": "100vw",
        "margin": 0,
        "padding": 0,
        "display": "flex",
        "flexDirection": "column",
        "fontFamily": roboto,
    },
    children=[
        # html.H1(
        #     "Trend on obesity",
        #     style={"textAlign": "center", "margin": "8px 0"},
        # ),
        html.Div(
            style={"flex": "1", "minHeight": 0},
            children=dcc.Graph(
                id="app3-line",
                figure=fig_line,
                style={"height": "100%", "width": "100%"},
                config={"displayModeBar": False},
                animate=False,
            ),
        ),
    ],
)

ALLOWED_DOWNLOADS = {
    "data.csv",
    "data_filled_neighbors.csv",
    "obesity.csv",
}

@server.route("/download/<path:filename>")
def download_csv(filename):
    if filename not in ALLOWED_DOWNLOADS:
        abort(404)
    return send_from_directory(DATA_DIR, filename, as_attachment=True)

# -----------------------------
# Run
# -----------------------------
if __name__ == "__main__":
    server.run(host="0.0.0.0", port=8050, debug=False)
