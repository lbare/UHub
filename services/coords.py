import xml.etree.ElementTree as ET

def extract_coordinates_from_kml(kml_file_path):
    # Parse the KML file
    tree = ET.parse(kml_file_path)
    root = tree.getroot()

    # KML namespace
    kml_ns = '{http://www.opengis.net/kml/2.2}'

    # Initialize an empty list to hold placemark data
    placemark_data = []

    # Iterate over all Placemark elements in the document
    for placemark in root.iter(f'{kml_ns}Placemark'):
        # Try to find a Polygon within the Placemark element
        polygon = placemark.find(f'.//{kml_ns}Polygon')
        if polygon is not None:
            # If a Polygon is found, try to get the
            name_element = placemark.find(f'{kml_ns}name')
            name = name_element.text if name_element is not None else "Unnamed"

            # Now find the coordinates element within the Polygon
            coordinates_element = polygon.find(f'.//{kml_ns}coordinates')
            if coordinates_element is not None:
                # Clean the coordinates string and split into tuples of (lat, lon)
                coord_strings = coordinates_element.text.strip().split()
                coord_tuples = [
                    (float(coord.split(',')[1]), float(coord.split(',')[0]))  # Reverse the lat and lon
                    for coord in coord_strings
                ]
                placemark_data.append((name, coord_tuples))

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
    file.write("];\n\nexport default placemarksData;")


print("Coordinates and names have been extracted to building_coordinates.txt")
