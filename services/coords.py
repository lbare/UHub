import xml.etree.ElementTree as ET
from shapely.geometry import Polygon
from shapely.geometry import mapping
from shapely.ops import transform
import json

# Function to scale the geometry - used for buffering without distortion
def scale(geom, xfact, yfact, origin='center'):
    return transform(lambda x, y, z=None: (x * xfact, y * yfact), geom)

def extract_coordinates_from_kml(kml_file_path, rounding_buffer=0.00002):
    # Parse the KML file
    tree = ET.parse(kml_file_path)
    root = tree.getroot()

    # KML namespace
    kml_ns = '{http://www.opengis.net/kml/2.2}'

    placemark_data = []
    for placemark in root.iter(f'{kml_ns}Placemark'):
        polygon = placemark.find(f'.//{kml_ns}Polygon//{kml_ns}coordinates')
        if polygon is not None:
            name = placemark.find(f'{kml_ns}name').text if placemark.find(f'{kml_ns}name') is not None else "Unnamed"
            coords = polygon.text.strip().split()
            coords_tuples = [(float(c.split(',')[1]), float(c.split(',')[0])) for c in coords]
            
            # Create a Shapely polygon
            shapely_polygon = Polygon(coords_tuples)

            # Buffer the polygon to round the corners, without significant scale change
            buffered_polygon = shapely_polygon.buffer(rounding_buffer, resolution=16)

            # Convert the buffered polygon back to coordinate tuples
            rounded_coords = list(buffered_polygon.exterior.coords)
            
            placemark_data.append((name, rounded_coords))

    return placemark_data

# Replace '/path/to/your/file.kml' with the actual path to your KML file.
kml_file_path = 'UHub.kml'

# Extract the coordinates
placemark_data = extract_coordinates_from_kml(kml_file_path)

# Output the coordinates to a text file, with each placemark separated by a line
with open('buildingPolygons.js', 'w') as file:
    file.write("const buildingPolygons = [\n")
    for index, (name, coordinates) in enumerate(placemark_data):
        # Start of the placemark object
        file.write(f"  {{\n    name: \"{name}\",\n    coordinates: [\n")
        
        for i, (lat, lon) in enumerate(coordinates):
            # Check if this is the last coordinate to avoid a trailing comma
            if i == len(coordinates) - 1:
                file.write(f"      {{ latitude: {lat:.6f}, longitude: {lon:.6f} }}\n")  # No trailing comma
            else:
                file.write(f"      {{ latitude: {lat:.6f}, longitude: {lon:.6f} }},\n")
        
        # End of the coordinates array and placemark object
        file.write("    ]\n  }")

        # Check if this is the last placemark to avoid a trailing comma
        if index == len(placemark_data) - 1:
            file.write("\n")  # No trailing comma
        else:
            file.write(",\n")  # Add a comma between placemark objects
    
    # End of the placemarks array
    file.write("];\n\nexport default buildingPolygons;")


