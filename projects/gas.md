---
layout: default
title: Gas
---
# Gas

<div class="links">
  <ul>
    <li><a href="https://github.com/walle/gas">Source on github</a></li>
    <li><a href="http://walle.github.com/gas">Project homepage</a></li>
  </ul>
</div>

A simple command line utility to switch between different git authors.

Perhaps you do some pair programming? Then use gas to easily switch from your regular user to the pair one.

## Example

    $ gas use pair-user
    $ git commit -a -m "Add feature"
    $ gas use regular-user

## Extendable

Gas is extendable using the same method as git itself. If you write an application according to the naming convention
you can use it as a gas command.

I have an example implementation called [gas-stats](https://github.com/walle/gas_stats).