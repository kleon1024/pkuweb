import pandas as pd
import json

nx_students = pd.read_excel("nx_students.xlsx", sheet_name=None)
nx_students = list(nx_students.values())[0]

users = []

for r in nx_students.iterrows():
    d = {}
    d['gaokao_id'] = str(r[1][0])
    t = r[1][1].split('/')
    d['birthdate'] = "".join([t[2], t[0], t[1]])
    users.append(d)

with open('nx_students.json', 'w') as f:
    f.write(json.dumps(users, indent=4, sort_keys=True))