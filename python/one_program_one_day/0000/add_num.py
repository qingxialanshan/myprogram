# add number to a picture
from PIL import Image,ImageDraw,ImageFont

def add_num(img):
    draw = ImageDraw.Draw(img)
    myfont = ImageFont.load_default().font
    fillcolor="#ff0000"
    width,height=img.size
    draw.text((width-10,10),'1',font=myfont,fill=fillcolor)
    img.save('result.jpg','jpeg')
    return 0

if __name__=='__main__':
    image = Image.open('image.png')
    add_num(image)
