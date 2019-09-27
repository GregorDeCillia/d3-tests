load_shapefile <- function(
  path = "https://data.statistik.gv.at/data/OGDEXT_NUTS_1_STATISTIK_AUSTRIA_NUTS3_20190101.zip",
  layer="STATISTIK_AUSTRIA_NUTS3_20190101")
{
  zipname <- basename(path)
  # lade .zip herunter
  my_shapefile <- paste0(getwd(),"/",zipname)
  download.file(path,my_shapefile)

  # unzip file
  unzipfolder <- paste0(sub(".zip","",my_shapefile))
  unzip(my_shapefile,exdir = unzipfolder)
  on.exit(unlink(unzipfolder, recursive = TRUE))

  # erzeuge shape file
  area_shape <- readOGR(dsn = unzipfolder, layer = layer)
  shape_tidy <- data.table(fortify(area_shape))
  #browser()

  nuts_mapping <- data.frame(
    nuts_code = area_shape[[1]],
    area_name = area_shape[[2]],
    id = as.character(1:length(area_shape) - 1)
  )
  #shape_tidy[, nuts_code := area_shape$id, by = id]
  # lösche zip file
  file.remove(my_shapefile)
  return(merge(shape_tidy, nuts_mapping))
}
