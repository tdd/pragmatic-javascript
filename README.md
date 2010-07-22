Pragmatic Guide to JavaScript (codebase)
========================================

This is the original codebase used in the book
“[Pragmatic Guide to JavaScript](http://pragprog.com/titles/pg_js/pragmatic-guide-to-javascript),”
authored by Christophe Porteneuve and published at the Pragmatic Bookshelf
  
Using this codebase
-------------------

You can get this codebase either from the book’s homepage, as an archive file,
or using this Github repository.  All necessary files are present and most files
can be run locally in your web browser.  A few files use a tiny PHP backend
to simulate processing times or demonstrate server-related stuff like Ajax,
JSON-P and the like, so you may need to run these through an HTTP server on
your machine.

This entire codebase is also accessible through a couple domain names; the
reason for multiple domain names is to help demonstrate cross-domain “Ajax”
requests.  The domains are:

  * [http://demo.pocketjavascript.com](http://demo.pocketjavascript.com)
  * [http://xdr.pocketjavascript.com](http://xdr.pocketjavascript.com)

This codebase and JavaScript frameworks
---------------------------------------

The codebase contains a number of pure-JS, no-framework items for the
bread-and-butter tasks.  Then it relies heavily on a well-known library.
Except for the lightbox task, where I went with the jQuery-based Fancybox
plugin, I relied on Prototype everywhere else.

Many people will prefer jQuery, or MooTools, or YUI, or Dojo, or
what-have-you.  In order to accomodate this need, I put the codebase on
Github to facilitate people forking it towards a version relying on
another framework than Prototype.

So check out the forks to find your flavor, and if it doesn't exist yet,
be bold and fork away!

Best,

Christophe.