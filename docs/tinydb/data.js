window.TINYDB = {
 "classes": {
  "TinyDB": {
   "name": "TinyDB",
   "module": "database",
   "lines": 172,
   "doc": "The main class of TinyDB.",
   "bases": [
    "TableBase"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 12,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Create a new instance of TinyDB."
    },
    {
     "name": "__repr__",
     "lines": 10,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "table",
     "lines": 23,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Get access to a specific table."
    },
    {
     "name": "tables",
     "lines": 27,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Get the names of all tables in the database."
    },
    {
     "name": "drop_tables",
     "lines": 12,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Drop all tables from the database. **CANNOT BE REVERSED!**"
    },
    {
     "name": "drop_table",
     "lines": 27,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Drop a specific table from the database. **CANNOT BE REVERSED!**"
    },
    {
     "name": "close",
     "lines": 17,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Close the database."
    },
    {
     "name": "__enter__",
     "lines": 11,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Use the database as a context manager."
    },
    {
     "name": "__exit__",
     "lines": 6,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Close the storage instance when leaving a context."
    },
    {
     "name": "__getattr__",
     "lines": 5,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Forward all unknown attribute calls to the default table instance."
    },
    {
     "name": "__len__",
     "lines": 9,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Get the total number of documents in the default table."
    },
    {
     "name": "__iter__",
     "lines": 5,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Return an iterator for the default table's documents."
    }
   ],
   "values": [
    {
     "name": "_opened",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "_storage",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "_tables",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "default_storage_class",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "table_class",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "default_table_name",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "storage",
     "kind": "property",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "__repr__",
     "to": "__len__",
     "kind": "self"
    },
    {
     "from": "__repr__",
     "to": "tables",
     "kind": "self"
    },
    {
     "from": "__repr__",
     "to": "table",
     "kind": "self"
    },
    {
     "from": "table",
     "to": "storage",
     "kind": "self"
    },
    {
     "from": "tables",
     "to": "storage",
     "kind": "self"
    },
    {
     "from": "drop_tables",
     "to": "storage",
     "kind": "self"
    },
    {
     "from": "drop_table",
     "to": "storage",
     "kind": "self"
    },
    {
     "from": "close",
     "to": "storage",
     "kind": "self"
    },
    {
     "from": "__exit__",
     "to": "close",
     "kind": "self"
    },
    {
     "from": "__getattr__",
     "to": "table",
     "kind": "self"
    },
    {
     "from": "__len__",
     "to": "table",
     "kind": "self"
    },
    {
     "from": "__iter__",
     "to": "table",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "_opened",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "_storage",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "_tables",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "default_storage_class",
     "op": "read"
    },
    {
     "gate": "table",
     "value": "_tables",
     "op": "read"
    },
    {
     "gate": "table",
     "value": "storage",
     "op": "read"
    },
    {
     "gate": "table",
     "value": "table_class",
     "op": "read"
    },
    {
     "gate": "tables",
     "value": "storage",
     "op": "read"
    },
    {
     "gate": "drop_tables",
     "value": "_tables",
     "op": "read"
    },
    {
     "gate": "drop_tables",
     "value": "storage",
     "op": "read"
    },
    {
     "gate": "drop_table",
     "value": "_tables",
     "op": "read"
    },
    {
     "gate": "drop_table",
     "value": "storage",
     "op": "read"
    },
    {
     "gate": "close",
     "value": "_opened",
     "op": "write"
    },
    {
     "gate": "close",
     "value": "storage",
     "op": "read"
    },
    {
     "gate": "__exit__",
     "value": "_opened",
     "op": "read"
    },
    {
     "gate": "__getattr__",
     "value": "default_table_name",
     "op": "read"
    },
    {
     "gate": "__len__",
     "value": "default_table_name",
     "op": "read"
    },
    {
     "gate": "__iter__",
     "value": "default_table_name",
     "op": "read"
    }
   ]
  },
  "Middleware": {
   "name": "Middleware",
   "module": "middlewares",
   "lines": 51,
   "doc": "The base class for all Middlewares.",
   "bases": [],
   "gates": [
    {
     "name": "__init__",
     "lines": 3,
     "vis": "internal",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__call__",
     "lines": 41,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Create the storage instance and store it as self.storage."
    },
    {
     "name": "__getattr__",
     "lines": 7,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Forward all unknown attribute calls to the underlying storage, so we remain as transparent as possible."
    }
   ],
   "values": [
    {
     "name": "_storage_cls",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "storage",
     "kind": "field",
     "mutated": true
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "_storage_cls",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "storage",
     "op": "write"
    },
    {
     "gate": "__call__",
     "value": "_storage_cls",
     "op": "read"
    },
    {
     "gate": "__call__",
     "value": "storage",
     "op": "write"
    }
   ]
  },
  "CachingMiddleware": {
   "name": "CachingMiddleware",
   "module": "middlewares",
   "lines": 51,
   "doc": "Add some caching to TinyDB.",
   "bases": [
    "Middleware"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 8,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "read",
     "lines": 10,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write",
     "lines": 11,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "flush",
     "lines": 11,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": "Flush all unwritten data to disk."
    },
    {
     "name": "close",
     "lines": 11,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "_cache_modified_count",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "_closed",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "cache",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "storage",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "WRITE_CACHE_SIZE",
     "kind": "classvar",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "write",
     "to": "flush",
     "kind": "self"
    },
    {
     "from": "close",
     "to": "flush",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "_cache_modified_count",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "_closed",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "cache",
     "op": "write"
    },
    {
     "gate": "read",
     "value": "_closed",
     "op": "read"
    },
    {
     "gate": "read",
     "value": "cache",
     "op": "write"
    },
    {
     "gate": "read",
     "value": "storage",
     "op": "read"
    },
    {
     "gate": "write",
     "value": "WRITE_CACHE_SIZE",
     "op": "read"
    },
    {
     "gate": "write",
     "value": "_cache_modified_count",
     "op": "write"
    },
    {
     "gate": "write",
     "value": "_closed",
     "op": "read"
    },
    {
     "gate": "write",
     "value": "cache",
     "op": "write"
    },
    {
     "gate": "flush",
     "value": "_cache_modified_count",
     "op": "write"
    },
    {
     "gate": "flush",
     "value": "_closed",
     "op": "read"
    },
    {
     "gate": "flush",
     "value": "cache",
     "op": "read"
    },
    {
     "gate": "flush",
     "value": "storage",
     "op": "read"
    },
    {
     "gate": "close",
     "value": "_closed",
     "op": "write"
    },
    {
     "gate": "close",
     "value": "cache",
     "op": "write"
    },
    {
     "gate": "close",
     "value": "storage",
     "op": "read"
    }
   ]
  },
  "TinyDBPlugin": {
   "name": "TinyDBPlugin",
   "module": "mypy_plugin",
   "lines": 21,
   "doc": null,
   "bases": [
    "Plugin"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 4,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "get_dynamic_class_hook",
     "lines": 17,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "named_placeholders",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "named_placeholders",
     "op": "write"
    }
   ]
  },
  "QueryLike": {
   "name": "QueryLike",
   "module": "queries",
   "lines": 2,
   "doc": "A typing protocol that acts like a query.",
   "bases": [
    "Protocol"
   ],
   "gates": [
    {
     "name": "__call__",
     "lines": 1,
     "vis": "internal",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__hash__",
     "lines": 1,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "QueryInstance": {
   "name": "QueryInstance",
   "module": "queries",
   "lines": 53,
   "doc": "A query instance.",
   "bases": [],
   "gates": [
    {
     "name": "__init__",
     "lines": 10,
     "vis": "internal",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "is_cacheable",
     "lines": 2,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__call__",
     "lines": 8,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Evaluate the query to check if it matches a specified value."
    },
    {
     "name": "__hash__",
     "lines": 5,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__repr__",
     "lines": 2,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__eq__",
     "lines": 5,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__and__",
     "lines": 9,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__or__",
     "lines": 9,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__invert__",
     "lines": 3,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "_hash",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "_test",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "__and__",
     "to": "is_cacheable",
     "kind": "self"
    },
    {
     "from": "__and__",
     "to": "is_cacheable",
     "kind": "typed"
    },
    {
     "from": "__and__",
     "to": "__call__",
     "kind": "implicit"
    },
    {
     "from": "__or__",
     "to": "is_cacheable",
     "kind": "self"
    },
    {
     "from": "__or__",
     "to": "is_cacheable",
     "kind": "typed"
    },
    {
     "from": "__or__",
     "to": "__call__",
     "kind": "implicit"
    },
    {
     "from": "__invert__",
     "to": "is_cacheable",
     "kind": "self"
    },
    {
     "from": "__invert__",
     "to": "__call__",
     "kind": "implicit"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "_hash",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "_test",
     "op": "write"
    },
    {
     "gate": "is_cacheable",
     "value": "_hash",
     "op": "read"
    },
    {
     "gate": "__call__",
     "value": "_test",
     "op": "read"
    },
    {
     "gate": "__hash__",
     "value": "_hash",
     "op": "read"
    },
    {
     "gate": "__repr__",
     "value": "_hash",
     "op": "read"
    },
    {
     "gate": "__eq__",
     "value": "_hash",
     "op": "read"
    },
    {
     "gate": "__and__",
     "value": "_hash",
     "op": "read"
    },
    {
     "gate": "__or__",
     "value": "_hash",
     "op": "read"
    },
    {
     "gate": "__invert__",
     "value": "_hash",
     "op": "read"
    }
   ]
  },
  "Query": {
   "name": "Query",
   "module": "queries",
   "lines": 335,
   "doc": "TinyDB Queries.",
   "bases": [
    "QueryInstance"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 12,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__repr__",
     "lines": 2,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__hash__",
     "lines": 2,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__getattr__",
     "lines": 13,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__getitem__",
     "lines": 10,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "_generate_test",
     "lines": 35,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": "Generate a query based on a test function that first resolves the query path."
    },
    {
     "name": "__eq__",
     "lines": 12,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Test a dict value for equality."
    },
    {
     "name": "__ne__",
     "lines": 12,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Test a dict value for inequality."
    },
    {
     "name": "__lt__",
     "lines": 12,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Test a dict value for being lower than another value."
    },
    {
     "name": "__le__",
     "lines": 12,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Test a dict value for being lower than or equal to another value."
    },
    {
     "name": "__gt__",
     "lines": 12,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Test a dict value for being greater than another value."
    },
    {
     "name": "__ge__",
     "lines": 12,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Test a dict value for being greater than or equal to another value."
    },
    {
     "name": "exists",
     "lines": 10,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Test for a dict where a provided key exists."
    },
    {
     "name": "matches",
     "lines": 18,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Run a regex test against a dict value (whole string has to match)."
    },
    {
     "name": "search",
     "lines": 20,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Run a regex test against a dict value (only substring string has to match)."
    },
    {
     "name": "test",
     "lines": 24,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Run a user-defined test function against a field value."
    },
    {
     "name": "any",
     "lines": 34,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Check if a condition is met by any document in a list, where a condition can also be a sequence (e.g. list)."
    },
    {
     "name": "all",
     "lines": 32,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Check if a condition is met by all documents in a list, where a condition can also be a sequence (e.g. list)."
    },
    {
     "name": "one_of",
     "lines": 12,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Check if the value is contained in a list or generator."
    },
    {
     "name": "fragment",
     "lines": 13,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "noop",
     "lines": 11,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Always evaluate to ``True``."
    },
    {
     "name": "map",
     "lines": 15,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Add a function to the query path. Similar to __getattr__ but for arbitrary functions."
    }
   ],
   "values": [
    {
     "name": "_path",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "__getitem__",
     "to": "__getattr__",
     "kind": "self"
    },
    {
     "from": "__eq__",
     "to": "_generate_test",
     "kind": "self"
    },
    {
     "from": "__ne__",
     "to": "_generate_test",
     "kind": "self"
    },
    {
     "from": "__lt__",
     "to": "_generate_test",
     "kind": "self"
    },
    {
     "from": "__le__",
     "to": "_generate_test",
     "kind": "self"
    },
    {
     "from": "__gt__",
     "to": "_generate_test",
     "kind": "self"
    },
    {
     "from": "__ge__",
     "to": "_generate_test",
     "kind": "self"
    },
    {
     "from": "exists",
     "to": "_generate_test",
     "kind": "self"
    },
    {
     "from": "matches",
     "to": "_generate_test",
     "kind": "self"
    },
    {
     "from": "search",
     "to": "_generate_test",
     "kind": "self"
    },
    {
     "from": "test",
     "to": "_generate_test",
     "kind": "self"
    },
    {
     "from": "any",
     "to": "_generate_test",
     "kind": "self"
    },
    {
     "from": "all",
     "to": "_generate_test",
     "kind": "self"
    },
    {
     "from": "one_of",
     "to": "_generate_test",
     "kind": "self"
    },
    {
     "from": "fragment",
     "to": "_generate_test",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "_path",
     "op": "write"
    },
    {
     "gate": "__getattr__",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "_generate_test",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "__eq__",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "__ne__",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "__lt__",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "__le__",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "__gt__",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "__ge__",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "exists",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "matches",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "search",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "test",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "any",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "all",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "one_of",
     "value": "_path",
     "op": "read"
    },
    {
     "gate": "map",
     "value": "_path",
     "op": "read"
    }
   ]
  },
  "Storage": {
   "name": "Storage",
   "module": "storages",
   "lines": 26,
   "doc": "The abstract base class for all Storages.",
   "bases": [
    "ABC"
   ],
   "gates": [
    {
     "name": "read",
     "lines": 10,
     "vis": "public",
     "dunder": false,
     "abstract": true,
     "doc": "Read the current state."
    },
    {
     "name": "write",
     "lines": 10,
     "vis": "public",
     "dunder": false,
     "abstract": true,
     "doc": "Write the current state of the database to the storage."
    },
    {
     "name": "close",
     "lines": 6,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Optional: Close open file handles, etc."
    }
   ],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "JSONStorage": {
   "name": "JSONStorage",
   "module": "storages",
   "lines": 75,
   "doc": "Store the data in a JSON file.",
   "bases": [
    "Storage"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 37,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Create a new instance."
    },
    {
     "name": "close",
     "lines": 2,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "read",
     "lines": 16,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write",
     "lines": 20,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "_handle",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "_mode",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "kwargs",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "_handle",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "_mode",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "kwargs",
     "op": "write"
    },
    {
     "gate": "close",
     "value": "_handle",
     "op": "read"
    },
    {
     "gate": "read",
     "value": "_handle",
     "op": "read"
    },
    {
     "gate": "write",
     "value": "_handle",
     "op": "read"
    },
    {
     "gate": "write",
     "value": "_mode",
     "op": "read"
    },
    {
     "gate": "write",
     "value": "kwargs",
     "op": "read"
    }
   ]
  },
  "MemoryStorage": {
   "name": "MemoryStorage",
   "module": "storages",
   "lines": 11,
   "doc": "Store the data as JSON in memory.",
   "bases": [
    "Storage"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 7,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Create a new instance."
    },
    {
     "name": "read",
     "lines": 2,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write",
     "lines": 2,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "memory",
     "kind": "field",
     "mutated": true
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "memory",
     "op": "write"
    },
    {
     "gate": "read",
     "value": "memory",
     "op": "read"
    },
    {
     "gate": "write",
     "value": "memory",
     "op": "write"
    }
   ]
  },
  "Document": {
   "name": "Document",
   "module": "table",
   "lines": 3,
   "doc": "A document stored in the database.",
   "bases": [
    "dict"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 3,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "doc_id",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "doc_id",
     "op": "write"
    }
   ]
  },
  "Table": {
   "name": "Table",
   "module": "table",
   "lines": 700,
   "doc": "Represents a single TinyDB table.",
   "bases": [],
   "gates": [
    {
     "name": "__init__",
     "lines": 21,
     "vis": "internal",
     "dunder": true,
     "abstract": false,
     "doc": "Create a table instance."
    },
    {
     "name": "__repr__",
     "lines": 8,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "insert",
     "lines": 39,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Insert a new document into the table."
    },
    {
     "name": "insert_multiple",
     "lines": 55,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Insert multiple documents into the table."
    },
    {
     "name": "all",
     "lines": 13,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Get all documents stored in the table."
    },
    {
     "name": "search",
     "lines": 49,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Search for all documents matching a 'where' cond."
    },
    {
     "name": "get",
     "lines": 65,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Get document(s) specified by a query or document ID(s)."
    },
    {
     "name": "contains",
     "lines": 23,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Check whether the database contains a document matching a query or an ID."
    },
    {
     "name": "update",
     "lines": 103,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Update all matching documents to have a given set of fields."
    },
    {
     "name": "update_multiple",
     "lines": 51,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Update all matching documents to have a given set of fields."
    },
    {
     "name": "upsert",
     "lines": 41,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Update documents, if they exist, insert them otherwise."
    },
    {
     "name": "remove",
     "lines": 72,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Remove all matching documents."
    },
    {
     "name": "truncate",
     "lines": 10,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Truncate the table by removing all documents."
    },
    {
     "name": "count",
     "lines": 8,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Count the documents matching a query."
    },
    {
     "name": "clear_cache",
     "lines": 6,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Clear the query cache."
    },
    {
     "name": "__len__",
     "lines": 6,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Count the total number of documents in this table."
    },
    {
     "name": "__iter__",
     "lines": 11,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": "Iterate over all documents stored in the table."
    },
    {
     "name": "_get_next_id",
     "lines": 34,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": "Return the ID for a newly inserted document."
    },
    {
     "name": "_read_table",
     "lines": 24,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": "Read the table data from the underlying storage."
    },
    {
     "name": "_update_table",
     "lines": 51,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": "Perform a table update operation."
    }
   ],
   "values": [
    {
     "name": "_name",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "_next_id",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "_query_cache",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "_storage",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "query_cache_class",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "document_class",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "document_id_class",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "name",
     "kind": "property",
     "mutated": false
    },
    {
     "name": "storage",
     "kind": "property",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "__init__",
     "to": "_update_table",
     "kind": "self"
    },
    {
     "from": "__init__",
     "to": "_read_table",
     "kind": "self"
    },
    {
     "from": "__repr__",
     "to": "name",
     "kind": "self"
    },
    {
     "from": "__repr__",
     "to": "__len__",
     "kind": "implicit"
    },
    {
     "from": "insert",
     "to": "_update_table",
     "kind": "self"
    },
    {
     "from": "insert",
     "to": "_get_next_id",
     "kind": "self"
    },
    {
     "from": "insert_multiple",
     "to": "_update_table",
     "kind": "self"
    },
    {
     "from": "insert_multiple",
     "to": "_get_next_id",
     "kind": "self"
    },
    {
     "from": "all",
     "to": "__iter__",
     "kind": "implicit"
    },
    {
     "from": "search",
     "to": "_read_table",
     "kind": "self"
    },
    {
     "from": "get",
     "to": "_read_table",
     "kind": "self"
    },
    {
     "from": "contains",
     "to": "get",
     "kind": "self"
    },
    {
     "from": "update",
     "to": "_update_table",
     "kind": "self"
    },
    {
     "from": "update_multiple",
     "to": "_update_table",
     "kind": "self"
    },
    {
     "from": "upsert",
     "to": "update",
     "kind": "self"
    },
    {
     "from": "upsert",
     "to": "insert",
     "kind": "self"
    },
    {
     "from": "remove",
     "to": "_update_table",
     "kind": "self"
    },
    {
     "from": "truncate",
     "to": "_update_table",
     "kind": "self"
    },
    {
     "from": "count",
     "to": "search",
     "kind": "self"
    },
    {
     "from": "__len__",
     "to": "_read_table",
     "kind": "self"
    },
    {
     "from": "__iter__",
     "to": "_read_table",
     "kind": "self"
    },
    {
     "from": "_get_next_id",
     "to": "_read_table",
     "kind": "self"
    },
    {
     "from": "_read_table",
     "to": "name",
     "kind": "self"
    },
    {
     "from": "_update_table",
     "to": "name",
     "kind": "self"
    },
    {
     "from": "_update_table",
     "to": "clear_cache",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "_name",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "_next_id",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "_query_cache",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "_storage",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "query_cache_class",
     "op": "read"
    },
    {
     "gate": "__repr__",
     "value": "_storage",
     "op": "read"
    },
    {
     "gate": "__repr__",
     "value": "name",
     "op": "read"
    },
    {
     "gate": "insert",
     "value": "_next_id",
     "op": "write"
    },
    {
     "gate": "insert",
     "value": "document_class",
     "op": "read"
    },
    {
     "gate": "insert_multiple",
     "value": "_next_id",
     "op": "write"
    },
    {
     "gate": "insert_multiple",
     "value": "document_class",
     "op": "read"
    },
    {
     "gate": "insert_multiple",
     "value": "document_id_class",
     "op": "read"
    },
    {
     "gate": "search",
     "value": "_query_cache",
     "op": "read"
    },
    {
     "gate": "search",
     "value": "document_class",
     "op": "read"
    },
    {
     "gate": "search",
     "value": "document_id_class",
     "op": "read"
    },
    {
     "gate": "get",
     "value": "document_class",
     "op": "read"
    },
    {
     "gate": "get",
     "value": "document_id_class",
     "op": "read"
    },
    {
     "gate": "upsert",
     "value": "document_class",
     "op": "read"
    },
    {
     "gate": "truncate",
     "value": "_next_id",
     "op": "write"
    },
    {
     "gate": "clear_cache",
     "value": "_query_cache",
     "op": "read"
    },
    {
     "gate": "__iter__",
     "value": "document_class",
     "op": "read"
    },
    {
     "gate": "__iter__",
     "value": "document_id_class",
     "op": "read"
    },
    {
     "gate": "_get_next_id",
     "value": "_next_id",
     "op": "write"
    },
    {
     "gate": "_get_next_id",
     "value": "document_id_class",
     "op": "read"
    },
    {
     "gate": "_read_table",
     "value": "_storage",
     "op": "read"
    },
    {
     "gate": "_read_table",
     "value": "name",
     "op": "read"
    },
    {
     "gate": "_update_table",
     "value": "_storage",
     "op": "read"
    },
    {
     "gate": "_update_table",
     "value": "document_id_class",
     "op": "read"
    },
    {
     "gate": "_update_table",
     "value": "name",
     "op": "read"
    }
   ]
  },
  "LRUCache": {
   "name": "LRUCache",
   "module": "utils",
   "lines": 48,
   "doc": "A least-recently used (LRU) cache with a fixed cache size.",
   "bases": [
    "abc.MutableMapping",
    "Generic[K, V]"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 3,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "clear",
     "lines": 2,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__len__",
     "lines": 2,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__contains__",
     "lines": 2,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__setitem__",
     "lines": 2,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__delitem__",
     "lines": 2,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__getitem__",
     "lines": 8,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__iter__",
     "lines": 2,
     "vis": "public",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "get",
     "lines": 9,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "set",
     "lines": 12,
     "vis": "public",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "cache",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "capacity",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "lru",
     "kind": "property",
     "mutated": false
    },
    {
     "name": "length",
     "kind": "property",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "__len__",
     "to": "length",
     "kind": "self"
    },
    {
     "from": "__setitem__",
     "to": "set",
     "kind": "self"
    },
    {
     "from": "set",
     "to": "length",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "cache",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "capacity",
     "op": "write"
    },
    {
     "gate": "clear",
     "value": "cache",
     "op": "read"
    },
    {
     "gate": "__len__",
     "value": "length",
     "op": "read"
    },
    {
     "gate": "__contains__",
     "value": "cache",
     "op": "read"
    },
    {
     "gate": "__delitem__",
     "value": "cache",
     "op": "read"
    },
    {
     "gate": "__getitem__",
     "value": "cache",
     "op": "read"
    },
    {
     "gate": "__iter__",
     "value": "cache",
     "op": "read"
    },
    {
     "gate": "get",
     "value": "cache",
     "op": "read"
    },
    {
     "gate": "set",
     "value": "cache",
     "op": "read"
    },
    {
     "gate": "set",
     "value": "capacity",
     "op": "read"
    },
    {
     "gate": "set",
     "value": "length",
     "op": "read"
    }
   ]
  },
  "FrozenDict": {
   "name": "FrozenDict",
   "module": "utils",
   "lines": 9,
   "doc": "An immutable dictionary.",
   "bases": [
    "dict"
   ],
   "gates": [
    {
     "name": "__hash__",
     "lines": 3,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "_immutable",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "update",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "pop",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [],
   "wires": [],
   "spokes": []
  }
 },
 "inherits": [
  {
   "child": "TinyDB",
   "parent": "Table",
   "typecheck": true
  },
  {
   "child": "CachingMiddleware",
   "parent": "Middleware",
   "typecheck": false
  },
  {
   "child": "Query",
   "parent": "QueryInstance",
   "typecheck": false
  },
  {
   "child": "JSONStorage",
   "parent": "Storage",
   "typecheck": false
  },
  {
   "child": "MemoryStorage",
   "parent": "Storage",
   "typecheck": false
  }
 ],
 "links": [
  {
   "kind": "impl",
   "from": {
    "cls": "TinyDB",
    "at": "gate",
    "name": "__repr__"
   },
   "to": {
    "cls": "Table",
    "at": "gate",
    "name": "__len__"
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "TinyDB",
    "at": "gate",
    "name": "table"
   },
   "to": {
    "cls": "Table",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "TinyDB",
    "at": "gate",
    "name": "tables"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "read"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "TinyDB",
    "at": "gate",
    "name": "drop_tables"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "write"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "TinyDB",
    "at": "gate",
    "name": "drop_table"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "read"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "TinyDB",
    "at": "gate",
    "name": "drop_table"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "write"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "TinyDB",
    "at": "gate",
    "name": "close"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "close"
   }
  },
  {
   "kind": "impl",
   "from": {
    "cls": "TinyDB",
    "at": "gate",
    "name": "__len__"
   },
   "to": {
    "cls": "Table",
    "at": "gate",
    "name": "__len__"
   }
  },
  {
   "kind": "impl",
   "from": {
    "cls": "TinyDB",
    "at": "gate",
    "name": "__iter__"
   },
   "to": {
    "cls": "Table",
    "at": "gate",
    "name": "__iter__"
   }
  },
  {
   "kind": "super",
   "from": {
    "cls": "CachingMiddleware",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Middleware",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "CachingMiddleware",
    "at": "gate",
    "name": "read"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "read"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "CachingMiddleware",
    "at": "gate",
    "name": "flush"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "write"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "CachingMiddleware",
    "at": "gate",
    "name": "close"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "close"
   }
  },
  {
   "kind": "super",
   "from": {
    "cls": "Query",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "QueryInstance",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "super",
   "from": {
    "cls": "Query",
    "at": "gate",
    "name": "__hash__"
   },
   "to": {
    "cls": "QueryInstance",
    "at": "gate",
    "name": "__hash__"
   }
  },
  {
   "kind": "write",
   "from": {
    "cls": "Query",
    "at": "gate",
    "name": "__getattr__"
   },
   "to": {
    "cls": "QueryInstance",
    "at": "value",
    "name": "_hash"
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Query",
    "at": "gate",
    "name": "_generate_test"
   },
   "to": {
    "cls": "QueryInstance",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "impl",
   "from": {
    "cls": "Query",
    "at": "gate",
    "name": "any"
   },
   "to": {
    "cls": "QueryInstance",
    "at": "gate",
    "name": "__call__"
   }
  },
  {
   "kind": "impl",
   "from": {
    "cls": "Query",
    "at": "gate",
    "name": "all"
   },
   "to": {
    "cls": "QueryInstance",
    "at": "gate",
    "name": "__call__"
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Query",
    "at": "gate",
    "name": "noop"
   },
   "to": {
    "cls": "QueryInstance",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "write",
   "from": {
    "cls": "Query",
    "at": "gate",
    "name": "map"
   },
   "to": {
    "cls": "QueryInstance",
    "at": "value",
    "name": "_hash"
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Table",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "LRUCache",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "Table",
    "at": "gate",
    "name": "search"
   },
   "to": {
    "cls": "LRUCache",
    "at": "gate",
    "name": "get"
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Table",
    "at": "gate",
    "name": "search"
   },
   "to": {
    "cls": "Document",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "impl",
   "from": {
    "cls": "Table",
    "at": "gate",
    "name": "search"
   },
   "to": {
    "cls": "LRUCache",
    "at": "gate",
    "name": "__setitem__"
   }
  },
  {
   "kind": "impl",
   "from": {
    "cls": "Table",
    "at": "gate",
    "name": "search"
   },
   "to": {
    "cls": "QueryLike",
    "at": "gate",
    "name": "__call__"
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Table",
    "at": "gate",
    "name": "get"
   },
   "to": {
    "cls": "Document",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "impl",
   "from": {
    "cls": "Table",
    "at": "gate",
    "name": "get"
   },
   "to": {
    "cls": "QueryLike",
    "at": "gate",
    "name": "__call__"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "Table",
    "at": "gate",
    "name": "clear_cache"
   },
   "to": {
    "cls": "LRUCache",
    "at": "gate",
    "name": "clear"
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Table",
    "at": "gate",
    "name": "__iter__"
   },
   "to": {
    "cls": "Document",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "Table",
    "at": "gate",
    "name": "_read_table"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "read"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "Table",
    "at": "gate",
    "name": "_update_table"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "read"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "Table",
    "at": "gate",
    "name": "_update_table"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "write"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "CachingMiddleware",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Middleware",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "Query",
    "at": "gate",
    "name": "__hash__"
   },
   "to": {
    "cls": "QueryInstance",
    "at": "gate",
    "name": "__hash__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "Query",
    "at": "gate",
    "name": "__eq__"
   },
   "to": {
    "cls": "QueryInstance",
    "at": "gate",
    "name": "__eq__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "Query",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "QueryInstance",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "Query",
    "at": "gate",
    "name": "__repr__"
   },
   "to": {
    "cls": "QueryInstance",
    "at": "gate",
    "name": "__repr__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "JSONStorage",
    "at": "gate",
    "name": "write"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "write"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "JSONStorage",
    "at": "gate",
    "name": "read"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "read"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "JSONStorage",
    "at": "gate",
    "name": "close"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "close"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "MemoryStorage",
    "at": "gate",
    "name": "write"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "write"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "MemoryStorage",
    "at": "gate",
    "name": "read"
   },
   "to": {
    "cls": "Storage",
    "at": "gate",
    "name": "read"
   }
  },
  {
   "kind": "hold",
   "from": {
    "cls": "TinyDB",
    "at": "value",
    "name": "default_storage_class"
   },
   "to": {
    "cls": "JSONStorage",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "hold",
   "from": {
    "cls": "TinyDB",
    "at": "value",
    "name": "table_class"
   },
   "to": {
    "cls": "Table",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "hold",
   "from": {
    "cls": "TinyDB",
    "at": "value",
    "name": "_storage"
   },
   "to": {
    "cls": "Storage",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "hold",
   "from": {
    "cls": "Middleware",
    "at": "value",
    "name": "storage"
   },
   "to": {
    "cls": "Storage",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "hold",
   "from": {
    "cls": "Table",
    "at": "value",
    "name": "document_class"
   },
   "to": {
    "cls": "Document",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "hold",
   "from": {
    "cls": "Table",
    "at": "value",
    "name": "query_cache_class"
   },
   "to": {
    "cls": "LRUCache",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "hold",
   "from": {
    "cls": "Table",
    "at": "value",
    "name": "_storage"
   },
   "to": {
    "cls": "Storage",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "hold",
   "from": {
    "cls": "Table",
    "at": "value",
    "name": "_query_cache"
   },
   "to": {
    "cls": "LRUCache",
    "at": "core",
    "name": null
   }
  }
 ],
 "package": {
  "name": "tinydb",
  "doc": "TinyDB is a tiny, document oriented database optimized for your happiness :)",
  "modules": {
   "__init__": "TinyDB is a tiny, document oriented database optimized for your happiness :)",
   "database": "This module contains the main component of TinyDB: the database.",
   "middlewares": "Contains the :class:`base class <tinydb.middlewares.Middleware>` for middlewares and implementations.",
   "mypy_plugin": null,
   "operations": "A collection of update operations for TinyDB.",
   "queries": "Contains the querying interface.",
   "storages": "Contains the :class:`base class <tinydb.storages.Storage>` for storages and implementations.",
   "table": "This module implements tables, the central place for accessing and manipulating data in TinyDB.",
   "utils": "Utility functions.",
   "version": null
  }
 }
};
