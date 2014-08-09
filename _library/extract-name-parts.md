---
layout: post
title: Extract Name Parts
site: https://github.com/ethanresnick/ExtractNameParts
image: 
creator: 
  - name: Ethan Resnick
    school: NYU
    twitter: ethanresnick
    eboard: true
    current: true
    role:
    - everything
launchdate:
demodays: false
---

A PHP class to break a full name string into its component parts (i.e. first name, last name, and (optionally) middle initial). A lot of websites still ask users for their first and last name in separate form fields. In most cases, I think this is unnecessary and bad for UX. Better to have one "Full Name" field and split the name up behind the scenes. This class does that splitting. It's built for English names.