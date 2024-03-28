import xml.etree.ElementTree as ET
from shapely.geometry import Polygon
import os

def extract_coordinates_from_kml(kml_file_path, building_name, rounding_buffer=0.00001):
    tree = ET.parse(kml_file_path)
    root = tree.getroot()
    kml_ns = '{http://www.opengis.net/kml/2.2}'
    vendor_data = []

    for placemark in root.iter(f'{kml_ns}Placemark'):
        name_element = placemark.find(f'{kml_ns}name')
        vendor_name = name_element.text if name_element is not None else "Unnamed"
        polygon = placemark.find(f'.//{kml_ns}Polygon//{kml_ns}coordinates')
        if polygon is not None:
            coords = polygon.text.strip().split()
            coords_tuples = [(float(c.split(',')[1]), float(c.split(',')[0])) for c in coords]
            shapely_polygon = Polygon(coords_tuples)
            buffered_polygon = shapely_polygon.buffer(rounding_buffer, resolution=16)
            rounded_coords = list(buffered_polygon.exterior.coords)
            vendor_data.append({
                "name": vendor_name,
                "building": building_name,
                "coordinates": rounded_coords
            })

    return vendor_data

building_names = ['BOOK', 'COVE', 'JCC', 'LIB', 'MAC', 'SUB']
kml_file_path = './KML/'
vendor_polygons = []

for building_name in building_names:
    full_path = f"{kml_file_path}{building_name}.kml"
    vendor_polygons.extend(extract_coordinates_from_kml(full_path, building_name))

js_file_path = 'VendorPolygons.js'
with open(js_file_path, 'w') as js_file:
    js_file.write("const vendorPolygons = [\n")
    for vendor in vendor_polygons:
        js_file.write(f"  {{\n    name: \"{vendor['name']}\",\n    building: \"{vendor['building']}\",\n    coordinates: [\n")
        for lat, lon in vendor['coordinates']:
            js_file.write(f"      {{ latitude: {lat:.6f}, longitude: {lon:.6f} }},\n")
        js_file.write("    ]\n  },\n")
    js_file.write("];\n\nexport default vendorPolygons;\n")

