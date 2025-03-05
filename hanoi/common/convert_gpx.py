import xml.etree.ElementTree as ET

# Path to the uploaded GPX file
gpx_file_path = "in/go_home_route.gpx"
# Save to a text file
output_file_path = "out/latlngs.js"

# Parse the GPX file
tree = ET.parse(gpx_file_path)
root = tree.getroot()

# Define GPX namespace (Garmin extensions use their own namespace)
namespaces = {
    "gpx": "http://www.topografix.com/GPX/1/1",  # Standard GPX namespace
    "gpxx": "http://www.garmin.com/xmlschemas/GpxExtensions/v3"  # Garmin extensions
}

latlngs = []
# Find all gpxx:rpt points
for rpt in root.findall(".//gpxx:rpt", namespaces):
    lat = rpt.get("lat")
    lon = rpt.get("lon")
    if lat and lon:
        latlngs.append([float(lat), float(lon)])

# Format as JavaScript variable
js_content = f"var latlngs = {latlngs};"


with open(output_file_path, "w") as output_file:
    output_file.write(js_content)

print(f"JavaScript variable saved to {output_file_path}")
