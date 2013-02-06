---
layout: default
title: Markdowneditor
---
# Markdowneditor

<div class="links">
  <ul>
    <li><a href="https://github.com/walle/markdowneditor">Source on github</a></li>
    <li><a href="http://markdowneditor.se">View it online</a></li>
  </ul>
</div>

This is a quick and dirty project I threw together one evening after reading [https://coderwall.com/p/lhsrcq](https://coderwall.com/p/lhsrcq).

It's a editor with live markdown preview. Three versions exist, one without possibility to save notes
to local storage. One with the possibility to save notes to lcal storage and a hosted version.

The thought is that you can save a bookmark with the editor embeded using

    data:text/html, {contents in index.html}

or save it as a file on your computer if you don't want to use the hosted version.