// Narration for the php-src slice (library/PLAY tour). The incident tour
// (?tour=incident) is scripted in alerts.js instead. "fallback" gives a line
// per file-planet; anything missing falls back to a generic description.
window.NARRATION = {
  packageDoc: "This is a slice of php-src, the engine behind PHP: a few files on one request path, lifted out of the whole source tree, each shown as a planet of functions.",
  outro: "That is the slice. Click any planet to fly back to it, or press the incident button for the PHP2Shell story.",
  outroVideo: "That is the slice: a file-upload reaching the session, the request allocator at its centre, and the request lifecycle around it.",
  order: ["rfc1867.c", "session.c", "SAPI.c", "zend_alloc.c", "zend.c", "main.c"],
  fallback: {
    "rfc1867.c": "Parses multipart form-data: the code that reads a file upload out of a request body.",
    "session.c": "The session extension: opening, reading, writing and serializing session data, including the upload-progress hook.",
    "SAPI.c": "The server interface layer: how the web server hands a request, and its POST body, to PHP.",
    "zend_alloc.c": "The Zend memory manager: every request allocation, and what happens when memory runs out.",
    "zend.c": "The heart of the engine: starting and ending execution, errors, and the bailout that unwinds on failure.",
    "main.c": "The request lifecycle: starting a request, shutting it down, and resetting state in between.",
    "zend_execute_API.c": "Calling into and out of PHP code from C.",
    "zend_hash.c": "Hash tables, the data structure behind arrays and most internal maps.",
    "zend_API.c": "Helpers extensions use to talk to the engine.",
    "zend_string.h": "Interned, reference-counted strings.",
    "zend_smart_str.h": "A growable string buffer used while building output.",
    "zend_llist.c": "A simple linked list used in a few core places.",
    "output.c": "PHP's output buffering layer.",
    "php_cli_server.c": "The built-in command-line web server.",
  },
};
