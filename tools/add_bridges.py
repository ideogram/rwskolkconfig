import xml.dom.minidom as minidom
import glob, os
import uuid

domBrugBeweegbaar = minidom.parse("../assets/brug/brug-beweegbaar.svg")
domBrugVast = minidom.parse("../assets/brug/brug-vast.svg")

for file in glob.glob("../assets/deur/*.svg"):
    # Deuren, beweegbare brug
    dom = minidom.parse(file)
    for node in domBrugBeweegbaar.getElementsByTagName('g'):
        x = dom.importNode(node, True)
        dom.childNodes[0].appendChild(x)

    filename = os.path.basename(file)
    file_handle = open("../assets/deur-met-brug-beweegbaar/"+filename ,"w+")
    dom.documentElement.writexml(file_handle)
    file_handle.close()

    # Deuren, vaste brug
    dom = minidom.parse(file)
    for node in domBrugVast.getElementsByTagName('g'):
        x = dom.importNode(node, True)
        dom.childNodes[0].appendChild(x)

    filename = os.path.basename(file)
    file_handle = open("../assets/deur-met-brug-vast/"+filename ,"w+")
    dom.documentElement.writexml(file_handle)
    file_handle.close()

for file in glob.glob("../assets/kolk/*.svg"):

    # Deuren, beweegbare brug
    dom = minidom.parse(file)
    for node in domBrugBeweegbaar.getElementsByTagName('g'):
        x = dom.importNode(node, True)
        dom.childNodes[0].appendChild(x)

    filename = os.path.basename(file)
    file_handle = open("../assets/kolk-met-brug-beweegbaar/"+filename ,"w+")
    dom.documentElement.writexml(file_handle)
    file_handle.close()

    # Deuren, vaste brug
    dom = minidom.parse(file)
    for node in domBrugVast.getElementsByTagName('g'):
        x = dom.importNode(node, True)
        dom.childNodes[0].appendChild(x)

    filename = os.path.basename(file)
    file_handle = open("../assets/kolk-met-brug-vast/"+filename ,"w+")
    dom.documentElement.writexml(file_handle)
    file_handle.close()




