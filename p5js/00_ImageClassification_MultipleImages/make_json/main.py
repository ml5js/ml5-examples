# -*- coding: utf-8 -*-

import json
text = open('tree.txt', 'rb')
data = {"images": {}}
category = ''
for line in text:
    import re
    if re.match('├── ', line):
        category = line.split('├── ')[1].strip()
        data["images"][category] = []
    elif re.match('└── ', line):
        category = line.split('└── ')[1].strip()
        data["images"][category] = []
    elif re.match('│   ├── ', line):
        data["images"][category].append(line.split('│   ├── ')[1].strip())
    elif re.match('│   └──', line):
        data["images"][category].append(line.split('│   └──')[1].strip())
    elif re.match('    ├── ', line):
        data["images"][category].append(line.split('    ├── ')[1].strip())
    elif re.match('    └── ', line):
        data["images"][category].append(line.split('    └── ')[1].strip())
    else:
        print line

with open('data.json', 'w') as f:
     json.dump(data, f)