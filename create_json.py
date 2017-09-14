# Schrijft een JSON-opgemaakte lijst met de sluis-elementen naar STD-out

import xml.dom.minidom as minidom
import glob, os

os.chdir("./assets")

print("[")
for file in glob.glob("*.svg"):
    filename = os.path.splitext(file)[0]
    print("\t{\"name\":\"%s\",\"shift\":0}," % (filename))

print("]")