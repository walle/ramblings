---
layout: default
title: Don't underestimate the work needed to do it yourself
---
# Don't underestimate the work needed to do it yourself

And let go of some control for the greater good.

When I started building this page I began with only an html page to mock up the layout and then some css and javascript
to make it look pretty. When this stage was complete I had to think about how to host it. Static html felt like the
way to go.

## So, what's my options here?

Well I know that I shouldn't reinvent the wheel, unless I want to do it as a learning experience, so where to?

[Jekyll](https://github.com/mojombo/jekyll) is well known and a lot of people use it. Why not me? I check it out and
feel that it's too much and too little at the same time. Not a perfect match.

I know ruby, so it won't be so hard to write a script that takes a bunch of markdown files and erb templates and creates
a static html page from them? No, well. It isn't that hard. But going from that first thought to start implementing and finding
all the corner cases you didn't think about at first doesn't take that long.

So after two - three hours I get a bit frustrated and well: "I'll give Jekyll a shot".

## Conclusion

Sitting here after one hour with the structure and layout finished, writing this, I know I have learned the same lesson
I have learned many times before:

> Don't underestimate the work needed to do it yourself.

Right now I only have one issue with Jekyll, and that is that I can't find a way to dynamically list all sub pages
of the projects folder without making them posts (that need a publishing date, which I don't want in the project urls).
So to add a new project I have to modify the projects page and add the new page. Not much of a compromise really.