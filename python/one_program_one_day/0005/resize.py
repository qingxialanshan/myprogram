# 0005: resize the image to adjust the iphone 5s
# iphone 5s's picture attribute is 1136x640

import os
import sys
import PIL
from PIL import Image

fixed_width=1136
fixed_height=640
def resize_image(org_img,des_img):
    # resize the imge to the fixed size 1136x640
    img = Image.open(org_img)
    img = img.resize((fixed_width,fixed_height),PIL.Image.ANTIALIAS)
    
    img.save(des_img)
    return

if __name__=="__main__":
    if len(sys.argv)<2:
        print "Need to input the orginal images folder"
        sys.exit(1)
    
    for img in os.listdir(sys.argv[1]):
        des_img='resized_'+img
        resize_image(os.path.join(sys.argv[1],img),des_img)
