---
layout: post
title:  "CSS - Gradients with blend modes"
date:   2017-11-24 20:30:20 +0100
categories: code
---

I love gradients. Maybe a bit too much sometimes? Is that a thing? For this site, I played around with it a lot and wanted to share some with you (in case you love gradients too!). 

### Gradient over an image with CSS blend mode 

![Two profile pictures of me. First one is normal, second one is blended with a gradient.]({{ "assets/profile-blend-mode.jpg" | absolute_url }})

I made this with a regular div element as I am setting the image with ``background-image``. I started with defining the width & height, together with a small border-radius. Since the height and the width are the same, I set it to a variable (using SASS). 
 
````
$profile-picture-dim: 120px;

.profile-picture { 
    width: $profile-picture-dim;
    height: $profile-picture-dim;
    border-radius: 5px; 
}
````

Our next step is to add the background-image. For this, we will need to add multiple backgrounds to our element. I think some browsers still don't support multiple backgrounds (I'm looking at you IE), so for fallback we will just have the regular image. 

``background-image: url('images/profile.jpg')``

Underneath this, we repeat ``background-image`` again but this time add our multiple background values. We are going to have 2 backgrounds, the image and the gradient. 

``
  background-image: url('images/profile.jpg'), linear-gradient(60deg, #33cccc 25%, #eb01a5 75%,  #e0e0e0 100%);
``

The gradient has a degree of 60, so it's going slightly upwards. But if we preview our image now, we can't see the gradient at all. 

### Blend it

Next we need to add our  ``background-blend-mode`` ! There are loads of different values and you can read [more about blend modes here](https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode). For this one, I used screen.

``background-blend-mode: screen``

And there you go! 