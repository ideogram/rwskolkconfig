import xml.dom.minidom as minidom
import glob, os, sys
import uuid


for file in glob.glob("../assets/*.svg"):

    dom = minidom.parse(file)

    node = dom.childNodes[0]

    viewBox = node.attributes['viewBox'].value.split(" ")

    width = viewBox[2]
    height = viewBox[3]

    newRectangle = dom.createElement("rect")

    newRectangle.setAttribute("x"  , "0")
    newRectangle.setAttribute("y", "0")
    newRectangle.setAttribute("width", width)
    newRectangle.setAttribute("height", height)
    newRectangle.setAttribute("fill", "#f0f0f0")

    dom.childNodes[0].insertBefore( newRectangle, node.firstChild )

    filename = os.path.splitext(file)[0]
    filename = filename.replace("../assets/","") + ".svg"

    file_handle = open("../assets2/"+filename ,"w")
    dom.documentElement.writexml(file_handle)
    file_handle.close()