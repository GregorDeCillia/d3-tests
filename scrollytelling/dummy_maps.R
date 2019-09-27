library(rgdal)
library(maptools)
library(rgeos)
library(data.table)
library(ggplot2)

source("load_shapefile.R")

wohnkosten_nuts2 <- data.frame(
  nuts2 = c(11L, 21L, 12L, 31L, 32L, 22L, 33L, 34L, 13L),
  wohnkosten = rnorm(9, 7, 2)
)

wohnkosten_nuts3 <- data.frame(
  nuts_code = c("AT125", "AT113", "AT121", "AT111", "AT112", "AT212", "AT124",
                "AT333", "AT223", "AT213", "AT222", "AT226", "AT122", "AT211",
                "AT127", "AT331", "AT123", "AT225", "AT130", "AT321", "AT126",
                "AT313", "AT314", "AT312", "AT311", "AT224", "AT315", "AT335",
                "AT221", "AT334", "AT322", "AT341", "AT332", "AT342", "AT323"
  ),
  wohnkosten = rnorm(35, 7, 2)
)

plot_range <- range(wohnkosten_nuts2$wohnkosten, wohnkosten_nuts3$wohnkosten)

shape_aut <- load_shapefile()
shape_aut[, nuts2 := as.numeric(substring(nuts_code, 3, 4))]

merge(shape_aut, wohnkosten_nuts2, by = "nuts2") %>%
  ggplot() +
  geom_polygon(aes(long, lat, group = group, fill = wohnkosten)) +
  scale_fill_gradientn(
    colours = c("#f9fbbb", "#b9294c"),
    limits = plot_range
  ) +
  theme_void() +
  theme(legend.position = "bottom", legend.key.width = unit(120, "pt")) +
  labs(fill = "€/m²")


ggsave("mieten_nuts2.png", height = 5.24, width = 10)

merge(shape_aut, wohnkosten_nuts3, by = "nuts_code") %>%
  ggplot() +
  geom_polygon(aes(long, lat, group = group, fill = wohnkosten)) +
  scale_fill_gradientn(
    colours = c("#f9fbbb", "#b9294c"),
    limits = plot_range
  ) +
  theme_void() +
  theme(legend.position = "bottom", legend.key.width = unit(120, "pt")) +
  labs(fill = "€/m²")

ggsave("mieten_nuts2.png", height = 5.24, width = 10)
