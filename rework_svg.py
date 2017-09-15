import xml.dom.minidom as minidom
import glob, os
import uuid

for file in glob.glob("./assets/*.svg"):
    #     Change the id of the svg element
    elementname = os.path.splitext(os.path.basename(file))[0]
    print elementname
    dom = minidom.parse(file)
    dom.documentElement.setAttribute("data-type",elementname)

    #  Add mark-up to the text element
    w = dom.documentElement.getAttribute("width")
    text = dom.getElementsByTagName("text")[0]
    text.setAttribute("font-size","36")
    text.setAttribute("font-family","sans-serif")
    text.setAttribute("text-anchor","middle")

    text.setAttribute("x", str(int(w)/2) )

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






