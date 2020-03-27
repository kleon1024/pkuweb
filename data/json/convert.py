import json
import re

path = "../../frontend/src/assets/survey/BasicInfo.js"

with open(path, 'r', encoding='utf8') as f:
    s = f.read().replace("export default ", "").replace(";", "")
    s = re.sub(r'([a-zA-Z0-9_]+):', r'"\1":', s)
    d = json.loads(s)

college_types = {}
# for item in d["college_types"]["options"]:
#     college_types[item["key"]] = item["description"]
college_types = d["college_types"]["options"]

cities = {}
# for item in d["college_locations"]["options"]:
#     cities[item["key"]] = item["city"]
cities = d["college_locations"]["options"]

with open("college_types.json", "w", encoding='utf8') as f:
    json.dump(college_types, f, indent=4, ensure_ascii=False)

with open("cities.json", "w", encoding='utf8') as f:
    json.dump(cities, f, indent=4, ensure_ascii=False)