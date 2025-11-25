from dash import Dash, dcc, html
import plotly.express as px
import pandas as pd

ANIMATION_DURATION_MS = 1000

app = Dash(__name__)

app.index_string = """
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

df = pd.read_excel("data/data.xlsx")

df = df[df["Entity"] != "World"]
df = df[df["Entity"].isin(set(df.loc[df["Year"] == 2018, "Entity"]))]

fig = px.scatter(
    df,
    x="gdp",
    y="Cost of a healthy diet",
    size="population",
    color="Entity",
    animation_frame="Year",
    animation_group="Entity",
    hover_name="Entity",
    size_max=60,
    log_x=True,
    labels={
        "gdp": "GDP per capita",
        "Cost of a healthy diet": "Cost of a healthy diet",
        "population": "Population",
    },
    title="Cost of a Healthy Diet vs GDP over Time",
    range_y=[0, 8],
)

fig.update_layout(
    template="plotly_white",
    xaxis_title="GDP per capita (log scale)",
    yaxis_title="Cost of a healthy diet",
    margin=dict(l=0, r=0, t=40, b=0),
)

if fig.layout.updatemenus and fig.layout.sliders:
    fig.layout.updatemenus[0].buttons[0].args[1]["frame"]["duration"] = ANIMATION_DURATION_MS * 2
    fig.layout.updatemenus[0].buttons[0].args[1]["transition"]["duration"] = ANIMATION_DURATION_MS
    fig.layout.sliders[0]["transition"]["duration"] = ANIMATION_DURATION_MS

app.layout = html.Div(
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
                figure=fig,
                style={"height": "100%", "width": "100%"},
                config={"displayModeBar": True},
            ),
        ),
    ],
)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8050, debug=False)
