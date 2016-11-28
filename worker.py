import multiprocessing
import time
import requests
import wand
from io import BytesIO
from wand.image import Image

def countColor(url):
    r = requests.get(url)
    with Image(file=BytesIO(r.content)) as img:
        print('format =', img.format)
        print('size =', img.size)

if __name__ == '__main__':
    countColor("http://xiangrenkai.com/img/avatar-rx.jpg")

    
