import xml.dom.minidom as minidom
import glob, os
import uuid

for file in glob.glob("./assets/*.svg"):
    dom = minidom.parse(file)

    # Change the id's linking the symbols and the use-elements:
    for symbol in dom.getElementsByTagName("symbol"):
        id = symbol.getAttribute('id')
        uniqueid = str(uuid.uuid4())[:8]
        for use in dom.getElementsByTagName("use"):
            href=use.getAttribute('xlink:href')
            if href == ( "#"+ id ):
                symbol.setAttribute('id',uniqueid)
                use.setAttribute('xlink:href',"#"+uniqueid)

    filename = os.path.basename(file)
    file_handle = open("./assets/"+filename,"w+")
    dom.documentElement.writexml(file_handle)
    file_handle.close()






