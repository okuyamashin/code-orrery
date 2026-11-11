window.TINYDB = {
 "classes": {
  "YAMLLoadWarning": {
   "name": "YAMLLoadWarning",
   "module": "__init__",
   "lines": 0,
   "doc": null,
   "bases": [
    "RuntimeWarning"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "YAMLObjectMetaclass": {
   "name": "YAMLObjectMetaclass",
   "module": "__init__",
   "lines": 10,
   "doc": "The metaclass for YAMLObject.",
   "bases": [
    "type"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 10,
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
  "YAMLObject": {
   "name": "YAMLObject",
   "module": "__init__",
   "lines": 11,
   "doc": "An object that can dump itself to a YAML stream and load itself from a YAML stream.",
   "bases": [],
   "gates": [
    {
     "name": "from_yaml",
     "lines": 5,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": "Convert a representation node to a Python object."
    },
    {
     "name": "to_yaml",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": "Convert a Python object to a representation node."
    }
   ],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "ComposerError": {
   "name": "ComposerError",
   "module": "composer",
   "lines": 0,
   "doc": null,
   "bases": [
    "MarkedYAMLError"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "Composer": {
   "name": "Composer",
   "module": "composer",
   "lines": 118,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "__init__",
     "lines": 2,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_node",
     "lines": 7,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "get_node",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "get_single_node",
     "lines": 20,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "compose_document",
     "lines": 12,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "compose_node",
     "lines": 24,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "compose_scalar_node",
     "lines": 10,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "compose_sequence_node",
     "lines": 17,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "compose_mapping_node",
     "lines": 22,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "anchors",
     "kind": "field",
     "mutated": true
    }
   ],
   "wires": [
    {
     "from": "get_node",
     "to": "compose_document",
     "kind": "self"
    },
    {
     "from": "get_single_node",
     "to": "compose_document",
     "kind": "self"
    },
    {
     "from": "compose_document",
     "to": "compose_node",
     "kind": "self"
    },
    {
     "from": "compose_node",
     "to": "compose_scalar_node",
     "kind": "self"
    },
    {
     "from": "compose_node",
     "to": "compose_sequence_node",
     "kind": "self"
    },
    {
     "from": "compose_node",
     "to": "compose_mapping_node",
     "kind": "self"
    },
    {
     "from": "compose_sequence_node",
     "to": "compose_node",
     "kind": "self"
    },
    {
     "from": "compose_mapping_node",
     "to": "compose_node",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "anchors",
     "op": "write"
    },
    {
     "gate": "compose_document",
     "value": "anchors",
     "op": "write"
    },
    {
     "gate": "compose_node",
     "value": "anchors",
     "op": "read"
    },
    {
     "gate": "compose_scalar_node",
     "value": "anchors",
     "op": "read"
    },
    {
     "gate": "compose_sequence_node",
     "value": "anchors",
     "op": "read"
    },
    {
     "gate": "compose_mapping_node",
     "value": "anchors",
     "op": "read"
    }
   ]
  },
  "ConstructorError": {
   "name": "ConstructorError",
   "module": "constructor",
   "lines": 0,
   "doc": null,
   "bases": [
    "MarkedYAMLError"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "BaseConstructor": {
   "name": "BaseConstructor",
   "module": "constructor",
   "lines": 132,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "__init__",
     "lines": 5,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_data",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_state_key",
     "lines": 7,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": "Block special attributes/methods from being set in a newly created object, to prevent user-controlled methods from being called during deserialization"
    },
    {
     "name": "get_data",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "get_single_data",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_document",
     "lines": 12,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_object",
     "lines": 49,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_scalar",
     "lines": 6,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_sequence",
     "lines": 7,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_mapping",
     "lines": 14,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_pairs",
     "lines": 11,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "add_constructor",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "add_multi_constructor",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "constructed_objects",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "deep_construct",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "recursive_objects",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "state_generators",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "yaml_constructors",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "yaml_multi_constructors",
     "kind": "classvar",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "get_data",
     "to": "construct_document",
     "kind": "self"
    },
    {
     "from": "get_single_data",
     "to": "construct_document",
     "kind": "self"
    },
    {
     "from": "construct_document",
     "to": "construct_object",
     "kind": "self"
    },
    {
     "from": "construct_sequence",
     "to": "construct_object",
     "kind": "self"
    },
    {
     "from": "construct_mapping",
     "to": "construct_object",
     "kind": "self"
    },
    {
     "from": "construct_pairs",
     "to": "construct_object",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "constructed_objects",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "deep_construct",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "recursive_objects",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "state_generators",
     "op": "write"
    },
    {
     "gate": "construct_document",
     "value": "constructed_objects",
     "op": "write"
    },
    {
     "gate": "construct_document",
     "value": "deep_construct",
     "op": "write"
    },
    {
     "gate": "construct_document",
     "value": "recursive_objects",
     "op": "write"
    },
    {
     "gate": "construct_document",
     "value": "state_generators",
     "op": "write"
    },
    {
     "gate": "construct_object",
     "value": "constructed_objects",
     "op": "read"
    },
    {
     "gate": "construct_object",
     "value": "deep_construct",
     "op": "write"
    },
    {
     "gate": "construct_object",
     "value": "recursive_objects",
     "op": "read"
    },
    {
     "gate": "construct_object",
     "value": "state_generators",
     "op": "read"
    },
    {
     "gate": "construct_object",
     "value": "yaml_constructors",
     "op": "read"
    },
    {
     "gate": "construct_object",
     "value": "yaml_multi_constructors",
     "op": "read"
    }
   ]
  },
  "SafeConstructor": {
   "name": "SafeConstructor",
   "module": "constructor",
   "lines": 215,
   "doc": null,
   "bases": [
    "BaseConstructor"
   ],
   "gates": [
    {
     "name": "construct_scalar",
     "lines": 6,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "flatten_mapping",
     "lines": 34,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_mapping",
     "lines": 4,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_yaml_null",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_yaml_bool",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_yaml_int",
     "lines": 27,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_yaml_float",
     "lines": 23,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_yaml_binary",
     "lines": 15,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_yaml_timestamp",
     "lines": 30,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_yaml_omap",
     "lines": 21,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_yaml_pairs",
     "lines": 20,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_yaml_set",
     "lines": 5,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_yaml_str",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_yaml_seq",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_yaml_map",
     "lines": 5,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_yaml_object",
     "lines": 9,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_undefined",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "bool_values",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "inf_value",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "nan_value",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "timestamp_regexp",
     "kind": "classvar",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "construct_mapping",
     "to": "flatten_mapping",
     "kind": "self"
    },
    {
     "from": "construct_yaml_null",
     "to": "construct_scalar",
     "kind": "self"
    },
    {
     "from": "construct_yaml_bool",
     "to": "construct_scalar",
     "kind": "self"
    },
    {
     "from": "construct_yaml_int",
     "to": "construct_scalar",
     "kind": "self"
    },
    {
     "from": "construct_yaml_float",
     "to": "construct_scalar",
     "kind": "self"
    },
    {
     "from": "construct_yaml_binary",
     "to": "construct_scalar",
     "kind": "self"
    },
    {
     "from": "construct_yaml_timestamp",
     "to": "construct_scalar",
     "kind": "self"
    },
    {
     "from": "construct_yaml_set",
     "to": "construct_mapping",
     "kind": "self"
    },
    {
     "from": "construct_yaml_str",
     "to": "construct_scalar",
     "kind": "self"
    },
    {
     "from": "construct_yaml_map",
     "to": "construct_mapping",
     "kind": "self"
    },
    {
     "from": "construct_yaml_object",
     "to": "construct_mapping",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "construct_yaml_bool",
     "value": "bool_values",
     "op": "read"
    },
    {
     "gate": "construct_yaml_float",
     "value": "inf_value",
     "op": "read"
    },
    {
     "gate": "construct_yaml_float",
     "value": "nan_value",
     "op": "read"
    },
    {
     "gate": "construct_yaml_timestamp",
     "value": "timestamp_regexp",
     "op": "read"
    }
   ]
  },
  "FullConstructor": {
   "name": "FullConstructor",
   "module": "constructor",
   "lines": 158,
   "doc": null,
   "bases": [
    "SafeConstructor"
   ],
   "gates": [
    {
     "name": "get_state_keys_blacklist",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "get_state_keys_blacklist_regexp",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_python_str",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_python_unicode",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_python_bytes",
     "lines": 15,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_python_long",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_python_complex",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_python_tuple",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "find_python_module",
     "lines": 14,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "find_python_name",
     "lines": 24,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_python_name",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_python_module",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "make_python_instance",
     "lines": 15,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "set_python_instance_state",
     "lines": 18,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_python_object",
     "lines": 8,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_python_object_apply",
     "lines": 34,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "construct_python_object_new",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "state_keys_blacklist_regexp",
     "kind": "field",
     "mutated": true
    }
   ],
   "wires": [
    {
     "from": "get_state_keys_blacklist_regexp",
     "to": "get_state_keys_blacklist",
     "kind": "self"
    },
    {
     "from": "construct_python_name",
     "to": "find_python_name",
     "kind": "self"
    },
    {
     "from": "construct_python_module",
     "to": "find_python_module",
     "kind": "self"
    },
    {
     "from": "make_python_instance",
     "to": "find_python_name",
     "kind": "self"
    },
    {
     "from": "construct_python_object",
     "to": "make_python_instance",
     "kind": "self"
    },
    {
     "from": "construct_python_object",
     "to": "set_python_instance_state",
     "kind": "self"
    },
    {
     "from": "construct_python_object_apply",
     "to": "make_python_instance",
     "kind": "self"
    },
    {
     "from": "construct_python_object_apply",
     "to": "set_python_instance_state",
     "kind": "self"
    },
    {
     "from": "construct_python_object_new",
     "to": "construct_python_object_apply",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "get_state_keys_blacklist_regexp",
     "value": "state_keys_blacklist_regexp",
     "op": "write"
    }
   ]
  },
  "UnsafeConstructor": {
   "name": "UnsafeConstructor",
   "module": "constructor",
   "lines": 10,
   "doc": null,
   "bases": [
    "FullConstructor"
   ],
   "gates": [
    {
     "name": "find_python_module",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "find_python_name",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "make_python_instance",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "set_python_instance_state",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "Constructor": {
   "name": "Constructor",
   "module": "constructor",
   "lines": 0,
   "doc": null,
   "bases": [
    "UnsafeConstructor"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "CBaseLoader": {
   "name": "CBaseLoader",
   "module": "cyaml",
   "lines": 4,
   "doc": null,
   "bases": [
    "CParser",
    "BaseConstructor",
    "BaseResolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 4,
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
  "CSafeLoader": {
   "name": "CSafeLoader",
   "module": "cyaml",
   "lines": 4,
   "doc": null,
   "bases": [
    "CParser",
    "SafeConstructor",
    "Resolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 4,
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
  "CFullLoader": {
   "name": "CFullLoader",
   "module": "cyaml",
   "lines": 4,
   "doc": null,
   "bases": [
    "CParser",
    "FullConstructor",
    "Resolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 4,
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
  "CUnsafeLoader": {
   "name": "CUnsafeLoader",
   "module": "cyaml",
   "lines": 4,
   "doc": null,
   "bases": [
    "CParser",
    "UnsafeConstructor",
    "Resolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 4,
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
  "CLoader": {
   "name": "CLoader",
   "module": "cyaml",
   "lines": 4,
   "doc": null,
   "bases": [
    "CParser",
    "Constructor",
    "Resolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 4,
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
  "CBaseDumper": {
   "name": "CBaseDumper",
   "module": "cyaml",
   "lines": 14,
   "doc": null,
   "bases": [
    "CEmitter",
    "BaseRepresenter",
    "BaseResolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 14,
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
  "CSafeDumper": {
   "name": "CSafeDumper",
   "module": "cyaml",
   "lines": 14,
   "doc": null,
   "bases": [
    "CEmitter",
    "SafeRepresenter",
    "Resolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 14,
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
  "CDumper": {
   "name": "CDumper",
   "module": "cyaml",
   "lines": 14,
   "doc": null,
   "bases": [
    "CEmitter",
    "Serializer",
    "Representer",
    "Resolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 14,
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
  "BaseDumper": {
   "name": "BaseDumper",
   "module": "dumper",
   "lines": 15,
   "doc": null,
   "bases": [
    "Emitter",
    "Serializer",
    "BaseRepresenter",
    "BaseResolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 15,
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
  "SafeDumper": {
   "name": "SafeDumper",
   "module": "dumper",
   "lines": 15,
   "doc": null,
   "bases": [
    "Emitter",
    "Serializer",
    "SafeRepresenter",
    "Resolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 15,
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
  "Dumper": {
   "name": "Dumper",
   "module": "dumper",
   "lines": 15,
   "doc": null,
   "bases": [
    "Emitter",
    "Serializer",
    "Representer",
    "Resolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 15,
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
  "EmitterError": {
   "name": "EmitterError",
   "module": "emitter",
   "lines": 0,
   "doc": null,
   "bases": [
    "YAMLError"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "ScalarAnalysis": {
   "name": "ScalarAnalysis",
   "module": "emitter",
   "lines": 12,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "__init__",
     "lines": 12,
     "vis": "internal",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "allow_block",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "allow_block_plain",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "allow_double_quoted",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "allow_flow_plain",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "allow_single_quoted",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "empty",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "multiline",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "scalar",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "allow_block",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "allow_block_plain",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "allow_double_quoted",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "allow_flow_plain",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "allow_single_quoted",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "empty",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "multiline",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "scalar",
     "op": "write"
    }
   ]
  },
  "Emitter": {
   "name": "Emitter",
   "module": "emitter",
   "lines": 996,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "__init__",
     "lines": 67,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "dispose",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "emit",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "need_more_events",
     "lines": 12,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "need_events",
     "lines": 12,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "increase_indent",
     "lines": 9,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_stream_start",
     "lines": 9,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_nothing",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_first_document_start",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_document_start",
     "lines": 35,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_document_end",
     "lines": 11,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_document_root",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_node",
     "lines": 27,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_alias",
     "lines": 5,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_scalar",
     "lines": 5,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_flow_sequence",
     "lines": 5,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_first_flow_sequence_item",
     "lines": 11,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_flow_sequence_item",
     "lines": 15,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_flow_mapping",
     "lines": 5,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_first_flow_mapping_key",
     "lines": 16,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_flow_mapping_key",
     "lines": 20,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_flow_mapping_simple_value",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_flow_mapping_value",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_block_sequence",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_first_block_sequence_item",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_block_sequence_item",
     "lines": 9,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_block_mapping",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_first_block_mapping_key",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_block_mapping_key",
     "lines": 13,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_block_mapping_simple_value",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "expect_block_mapping_value",
     "lines": 5,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_empty_sequence",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_empty_mapping",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_empty_document",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_simple_key",
     "lines": 19,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "process_anchor",
     "lines": 9,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "process_tag",
     "lines": 24,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "choose_scalar_style",
     "lines": 20,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "process_scalar",
     "lines": 21,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "prepare_version",
     "lines": 5,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "prepare_tag_handle",
     "lines": 11,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "prepare_tag_prefix",
     "lines": 22,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "prepare_tag",
     "lines": 35,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "prepare_anchor",
     "lines": 9,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "analyze_scalar",
     "lines": 159,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "flush_stream",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write_stream_start",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write_stream_end",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write_indicator",
     "lines": 13,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write_indent",
     "lines": 12,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write_line_break",
     "lines": 10,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write_version_directive",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write_tag_directive",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write_single_quoted",
     "lines": 53,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write_double_quoted",
     "lines": 53,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "determine_block_hints",
     "lines": 10,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write_folded",
     "lines": 53,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write_literal",
     "lines": 34,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "write_plain",
     "lines": 58,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "allow_unicode",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "analysis",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "best_indent",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "best_line_break",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "best_width",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "canonical",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "column",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "encoding",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "event",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "events",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "flow_level",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "indent",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "indention",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "indents",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "line",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "mapping_context",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "open_ended",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "prepared_anchor",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "prepared_tag",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "root_context",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "sequence_context",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "simple_key_context",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "state",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "states",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "stream",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "style",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "tag_prefixes",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "whitespace",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "DEFAULT_TAG_PREFIXES",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "ESCAPE_REPLACEMENTS",
     "kind": "classvar",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "__init__",
     "to": "expect_stream_start",
     "kind": "self"
    },
    {
     "from": "emit",
     "to": "need_more_events",
     "kind": "self"
    },
    {
     "from": "need_more_events",
     "to": "need_events",
     "kind": "self"
    },
    {
     "from": "expect_stream_start",
     "to": "expect_first_document_start",
     "kind": "self"
    },
    {
     "from": "expect_stream_start",
     "to": "write_stream_start",
     "kind": "self"
    },
    {
     "from": "expect_first_document_start",
     "to": "expect_document_start",
     "kind": "self"
    },
    {
     "from": "expect_document_start",
     "to": "expect_document_root",
     "kind": "self"
    },
    {
     "from": "expect_document_start",
     "to": "expect_nothing",
     "kind": "self"
    },
    {
     "from": "expect_document_start",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "expect_document_start",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "expect_document_start",
     "to": "prepare_version",
     "kind": "self"
    },
    {
     "from": "expect_document_start",
     "to": "write_version_directive",
     "kind": "self"
    },
    {
     "from": "expect_document_start",
     "to": "write_stream_end",
     "kind": "self"
    },
    {
     "from": "expect_document_start",
     "to": "prepare_tag_handle",
     "kind": "self"
    },
    {
     "from": "expect_document_start",
     "to": "prepare_tag_prefix",
     "kind": "self"
    },
    {
     "from": "expect_document_start",
     "to": "write_tag_directive",
     "kind": "self"
    },
    {
     "from": "expect_document_start",
     "to": "check_empty_document",
     "kind": "self"
    },
    {
     "from": "expect_document_end",
     "to": "expect_document_start",
     "kind": "self"
    },
    {
     "from": "expect_document_end",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "expect_document_end",
     "to": "flush_stream",
     "kind": "self"
    },
    {
     "from": "expect_document_end",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "expect_document_root",
     "to": "expect_document_end",
     "kind": "self"
    },
    {
     "from": "expect_document_root",
     "to": "expect_node",
     "kind": "self"
    },
    {
     "from": "expect_node",
     "to": "expect_alias",
     "kind": "self"
    },
    {
     "from": "expect_node",
     "to": "process_anchor",
     "kind": "self"
    },
    {
     "from": "expect_node",
     "to": "process_tag",
     "kind": "self"
    },
    {
     "from": "expect_node",
     "to": "expect_scalar",
     "kind": "self"
    },
    {
     "from": "expect_node",
     "to": "check_empty_sequence",
     "kind": "self"
    },
    {
     "from": "expect_node",
     "to": "expect_flow_sequence",
     "kind": "self"
    },
    {
     "from": "expect_node",
     "to": "expect_block_sequence",
     "kind": "self"
    },
    {
     "from": "expect_node",
     "to": "check_empty_mapping",
     "kind": "self"
    },
    {
     "from": "expect_node",
     "to": "expect_flow_mapping",
     "kind": "self"
    },
    {
     "from": "expect_node",
     "to": "expect_block_mapping",
     "kind": "self"
    },
    {
     "from": "expect_alias",
     "to": "process_anchor",
     "kind": "self"
    },
    {
     "from": "expect_scalar",
     "to": "increase_indent",
     "kind": "self"
    },
    {
     "from": "expect_scalar",
     "to": "process_scalar",
     "kind": "self"
    },
    {
     "from": "expect_flow_sequence",
     "to": "expect_first_flow_sequence_item",
     "kind": "self"
    },
    {
     "from": "expect_flow_sequence",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "expect_flow_sequence",
     "to": "increase_indent",
     "kind": "self"
    },
    {
     "from": "expect_first_flow_sequence_item",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "expect_first_flow_sequence_item",
     "to": "expect_flow_sequence_item",
     "kind": "self"
    },
    {
     "from": "expect_first_flow_sequence_item",
     "to": "expect_node",
     "kind": "self"
    },
    {
     "from": "expect_first_flow_sequence_item",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "expect_flow_sequence_item",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "expect_flow_sequence_item",
     "to": "expect_node",
     "kind": "self"
    },
    {
     "from": "expect_flow_sequence_item",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping",
     "to": "expect_first_flow_mapping_key",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping",
     "to": "increase_indent",
     "kind": "self"
    },
    {
     "from": "expect_first_flow_mapping_key",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "expect_first_flow_mapping_key",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "expect_first_flow_mapping_key",
     "to": "check_simple_key",
     "kind": "self"
    },
    {
     "from": "expect_first_flow_mapping_key",
     "to": "expect_flow_mapping_simple_value",
     "kind": "self"
    },
    {
     "from": "expect_first_flow_mapping_key",
     "to": "expect_node",
     "kind": "self"
    },
    {
     "from": "expect_first_flow_mapping_key",
     "to": "expect_flow_mapping_value",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping_key",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping_key",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping_key",
     "to": "check_simple_key",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping_key",
     "to": "expect_flow_mapping_simple_value",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping_key",
     "to": "expect_node",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping_key",
     "to": "expect_flow_mapping_value",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping_simple_value",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping_simple_value",
     "to": "expect_flow_mapping_key",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping_simple_value",
     "to": "expect_node",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping_value",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping_value",
     "to": "expect_flow_mapping_key",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping_value",
     "to": "expect_node",
     "kind": "self"
    },
    {
     "from": "expect_flow_mapping_value",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "expect_block_sequence",
     "to": "expect_first_block_sequence_item",
     "kind": "self"
    },
    {
     "from": "expect_block_sequence",
     "to": "increase_indent",
     "kind": "self"
    },
    {
     "from": "expect_first_block_sequence_item",
     "to": "expect_block_sequence_item",
     "kind": "self"
    },
    {
     "from": "expect_block_sequence_item",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "expect_block_sequence_item",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "expect_block_sequence_item",
     "to": "expect_node",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping",
     "to": "expect_first_block_mapping_key",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping",
     "to": "increase_indent",
     "kind": "self"
    },
    {
     "from": "expect_first_block_mapping_key",
     "to": "expect_block_mapping_key",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping_key",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping_key",
     "to": "check_simple_key",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping_key",
     "to": "expect_block_mapping_simple_value",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping_key",
     "to": "expect_node",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping_key",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping_key",
     "to": "expect_block_mapping_value",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping_simple_value",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping_simple_value",
     "to": "expect_block_mapping_key",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping_simple_value",
     "to": "expect_node",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping_value",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping_value",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping_value",
     "to": "expect_block_mapping_key",
     "kind": "self"
    },
    {
     "from": "expect_block_mapping_value",
     "to": "expect_node",
     "kind": "self"
    },
    {
     "from": "check_simple_key",
     "to": "prepare_anchor",
     "kind": "self"
    },
    {
     "from": "check_simple_key",
     "to": "prepare_tag",
     "kind": "self"
    },
    {
     "from": "check_simple_key",
     "to": "analyze_scalar",
     "kind": "self"
    },
    {
     "from": "check_simple_key",
     "to": "check_empty_sequence",
     "kind": "self"
    },
    {
     "from": "check_simple_key",
     "to": "check_empty_mapping",
     "kind": "self"
    },
    {
     "from": "process_anchor",
     "to": "prepare_anchor",
     "kind": "self"
    },
    {
     "from": "process_anchor",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "process_tag",
     "to": "prepare_tag",
     "kind": "self"
    },
    {
     "from": "process_tag",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "process_tag",
     "to": "choose_scalar_style",
     "kind": "self"
    },
    {
     "from": "choose_scalar_style",
     "to": "analyze_scalar",
     "kind": "self"
    },
    {
     "from": "process_scalar",
     "to": "analyze_scalar",
     "kind": "self"
    },
    {
     "from": "process_scalar",
     "to": "choose_scalar_style",
     "kind": "self"
    },
    {
     "from": "process_scalar",
     "to": "write_double_quoted",
     "kind": "self"
    },
    {
     "from": "process_scalar",
     "to": "write_single_quoted",
     "kind": "self"
    },
    {
     "from": "process_scalar",
     "to": "write_folded",
     "kind": "self"
    },
    {
     "from": "process_scalar",
     "to": "write_literal",
     "kind": "self"
    },
    {
     "from": "process_scalar",
     "to": "write_plain",
     "kind": "self"
    },
    {
     "from": "write_stream_end",
     "to": "flush_stream",
     "kind": "self"
    },
    {
     "from": "write_indent",
     "to": "write_line_break",
     "kind": "self"
    },
    {
     "from": "write_version_directive",
     "to": "write_line_break",
     "kind": "self"
    },
    {
     "from": "write_tag_directive",
     "to": "write_line_break",
     "kind": "self"
    },
    {
     "from": "write_single_quoted",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "write_single_quoted",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "write_single_quoted",
     "to": "write_line_break",
     "kind": "self"
    },
    {
     "from": "write_double_quoted",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "write_double_quoted",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "write_folded",
     "to": "determine_block_hints",
     "kind": "self"
    },
    {
     "from": "write_folded",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "write_folded",
     "to": "write_line_break",
     "kind": "self"
    },
    {
     "from": "write_folded",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "write_literal",
     "to": "determine_block_hints",
     "kind": "self"
    },
    {
     "from": "write_literal",
     "to": "write_indicator",
     "kind": "self"
    },
    {
     "from": "write_literal",
     "to": "write_line_break",
     "kind": "self"
    },
    {
     "from": "write_literal",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "write_plain",
     "to": "write_indent",
     "kind": "self"
    },
    {
     "from": "write_plain",
     "to": "write_line_break",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "allow_unicode",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "analysis",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "best_indent",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "best_line_break",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "best_width",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "canonical",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "column",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "encoding",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "event",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "events",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "flow_level",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "indent",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "indention",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "indents",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "line",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "mapping_context",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "open_ended",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "prepared_anchor",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "prepared_tag",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "root_context",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "sequence_context",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "simple_key_context",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "states",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "stream",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "style",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "tag_prefixes",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "whitespace",
     "op": "write"
    },
    {
     "gate": "dispose",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "dispose",
     "value": "states",
     "op": "write"
    },
    {
     "gate": "emit",
     "value": "event",
     "op": "write"
    },
    {
     "gate": "emit",
     "value": "events",
     "op": "read"
    },
    {
     "gate": "emit",
     "value": "state",
     "op": "read"
    },
    {
     "gate": "need_more_events",
     "value": "events",
     "op": "read"
    },
    {
     "gate": "need_events",
     "value": "events",
     "op": "read"
    },
    {
     "gate": "increase_indent",
     "value": "best_indent",
     "op": "read"
    },
    {
     "gate": "increase_indent",
     "value": "indent",
     "op": "write"
    },
    {
     "gate": "increase_indent",
     "value": "indents",
     "op": "read"
    },
    {
     "gate": "expect_stream_start",
     "value": "encoding",
     "op": "write"
    },
    {
     "gate": "expect_stream_start",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "expect_stream_start",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_stream_start",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "expect_nothing",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "expect_document_start",
     "value": "DEFAULT_TAG_PREFIXES",
     "op": "read"
    },
    {
     "gate": "expect_document_start",
     "value": "canonical",
     "op": "read"
    },
    {
     "gate": "expect_document_start",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "expect_document_start",
     "value": "open_ended",
     "op": "read"
    },
    {
     "gate": "expect_document_start",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_document_start",
     "value": "tag_prefixes",
     "op": "write"
    },
    {
     "gate": "expect_document_end",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "expect_document_end",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_document_root",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "expect_node",
     "value": "canonical",
     "op": "read"
    },
    {
     "gate": "expect_node",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "expect_node",
     "value": "flow_level",
     "op": "read"
    },
    {
     "gate": "expect_node",
     "value": "mapping_context",
     "op": "write"
    },
    {
     "gate": "expect_node",
     "value": "root_context",
     "op": "write"
    },
    {
     "gate": "expect_node",
     "value": "sequence_context",
     "op": "write"
    },
    {
     "gate": "expect_node",
     "value": "simple_key_context",
     "op": "write"
    },
    {
     "gate": "expect_alias",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "expect_alias",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_alias",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "expect_scalar",
     "value": "indent",
     "op": "write"
    },
    {
     "gate": "expect_scalar",
     "value": "indents",
     "op": "read"
    },
    {
     "gate": "expect_scalar",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_scalar",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "expect_flow_sequence",
     "value": "flow_level",
     "op": "write"
    },
    {
     "gate": "expect_flow_sequence",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_first_flow_sequence_item",
     "value": "best_width",
     "op": "read"
    },
    {
     "gate": "expect_first_flow_sequence_item",
     "value": "canonical",
     "op": "read"
    },
    {
     "gate": "expect_first_flow_sequence_item",
     "value": "column",
     "op": "read"
    },
    {
     "gate": "expect_first_flow_sequence_item",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "expect_first_flow_sequence_item",
     "value": "flow_level",
     "op": "write"
    },
    {
     "gate": "expect_first_flow_sequence_item",
     "value": "indent",
     "op": "write"
    },
    {
     "gate": "expect_first_flow_sequence_item",
     "value": "indents",
     "op": "read"
    },
    {
     "gate": "expect_first_flow_sequence_item",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_first_flow_sequence_item",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "expect_flow_sequence_item",
     "value": "best_width",
     "op": "read"
    },
    {
     "gate": "expect_flow_sequence_item",
     "value": "canonical",
     "op": "read"
    },
    {
     "gate": "expect_flow_sequence_item",
     "value": "column",
     "op": "read"
    },
    {
     "gate": "expect_flow_sequence_item",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "expect_flow_sequence_item",
     "value": "flow_level",
     "op": "write"
    },
    {
     "gate": "expect_flow_sequence_item",
     "value": "indent",
     "op": "write"
    },
    {
     "gate": "expect_flow_sequence_item",
     "value": "indents",
     "op": "read"
    },
    {
     "gate": "expect_flow_sequence_item",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_flow_sequence_item",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "expect_flow_mapping",
     "value": "flow_level",
     "op": "write"
    },
    {
     "gate": "expect_flow_mapping",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_first_flow_mapping_key",
     "value": "best_width",
     "op": "read"
    },
    {
     "gate": "expect_first_flow_mapping_key",
     "value": "canonical",
     "op": "read"
    },
    {
     "gate": "expect_first_flow_mapping_key",
     "value": "column",
     "op": "read"
    },
    {
     "gate": "expect_first_flow_mapping_key",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "expect_first_flow_mapping_key",
     "value": "flow_level",
     "op": "write"
    },
    {
     "gate": "expect_first_flow_mapping_key",
     "value": "indent",
     "op": "write"
    },
    {
     "gate": "expect_first_flow_mapping_key",
     "value": "indents",
     "op": "read"
    },
    {
     "gate": "expect_first_flow_mapping_key",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_first_flow_mapping_key",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "expect_flow_mapping_key",
     "value": "best_width",
     "op": "read"
    },
    {
     "gate": "expect_flow_mapping_key",
     "value": "canonical",
     "op": "read"
    },
    {
     "gate": "expect_flow_mapping_key",
     "value": "column",
     "op": "read"
    },
    {
     "gate": "expect_flow_mapping_key",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "expect_flow_mapping_key",
     "value": "flow_level",
     "op": "write"
    },
    {
     "gate": "expect_flow_mapping_key",
     "value": "indent",
     "op": "write"
    },
    {
     "gate": "expect_flow_mapping_key",
     "value": "indents",
     "op": "read"
    },
    {
     "gate": "expect_flow_mapping_key",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_flow_mapping_key",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "expect_flow_mapping_simple_value",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "expect_flow_mapping_value",
     "value": "best_width",
     "op": "read"
    },
    {
     "gate": "expect_flow_mapping_value",
     "value": "canonical",
     "op": "read"
    },
    {
     "gate": "expect_flow_mapping_value",
     "value": "column",
     "op": "read"
    },
    {
     "gate": "expect_flow_mapping_value",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "expect_block_sequence",
     "value": "indention",
     "op": "read"
    },
    {
     "gate": "expect_block_sequence",
     "value": "mapping_context",
     "op": "read"
    },
    {
     "gate": "expect_block_sequence",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_block_sequence_item",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "expect_block_sequence_item",
     "value": "indent",
     "op": "write"
    },
    {
     "gate": "expect_block_sequence_item",
     "value": "indents",
     "op": "read"
    },
    {
     "gate": "expect_block_sequence_item",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_block_sequence_item",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "expect_block_mapping",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_block_mapping_key",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "expect_block_mapping_key",
     "value": "indent",
     "op": "write"
    },
    {
     "gate": "expect_block_mapping_key",
     "value": "indents",
     "op": "read"
    },
    {
     "gate": "expect_block_mapping_key",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "expect_block_mapping_key",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "expect_block_mapping_simple_value",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "expect_block_mapping_value",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "check_empty_sequence",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "check_empty_sequence",
     "value": "events",
     "op": "read"
    },
    {
     "gate": "check_empty_mapping",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "check_empty_mapping",
     "value": "events",
     "op": "read"
    },
    {
     "gate": "check_empty_document",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "check_empty_document",
     "value": "events",
     "op": "read"
    },
    {
     "gate": "check_simple_key",
     "value": "analysis",
     "op": "write"
    },
    {
     "gate": "check_simple_key",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "check_simple_key",
     "value": "prepared_anchor",
     "op": "write"
    },
    {
     "gate": "check_simple_key",
     "value": "prepared_tag",
     "op": "write"
    },
    {
     "gate": "process_anchor",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "process_anchor",
     "value": "prepared_anchor",
     "op": "write"
    },
    {
     "gate": "process_tag",
     "value": "canonical",
     "op": "read"
    },
    {
     "gate": "process_tag",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "process_tag",
     "value": "prepared_tag",
     "op": "write"
    },
    {
     "gate": "process_tag",
     "value": "style",
     "op": "write"
    },
    {
     "gate": "choose_scalar_style",
     "value": "analysis",
     "op": "write"
    },
    {
     "gate": "choose_scalar_style",
     "value": "canonical",
     "op": "read"
    },
    {
     "gate": "choose_scalar_style",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "choose_scalar_style",
     "value": "flow_level",
     "op": "read"
    },
    {
     "gate": "choose_scalar_style",
     "value": "simple_key_context",
     "op": "read"
    },
    {
     "gate": "process_scalar",
     "value": "analysis",
     "op": "write"
    },
    {
     "gate": "process_scalar",
     "value": "event",
     "op": "read"
    },
    {
     "gate": "process_scalar",
     "value": "simple_key_context",
     "op": "read"
    },
    {
     "gate": "process_scalar",
     "value": "style",
     "op": "write"
    },
    {
     "gate": "prepare_tag",
     "value": "tag_prefixes",
     "op": "read"
    },
    {
     "gate": "analyze_scalar",
     "value": "allow_unicode",
     "op": "read"
    },
    {
     "gate": "flush_stream",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "write_stream_start",
     "value": "encoding",
     "op": "read"
    },
    {
     "gate": "write_stream_start",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "write_indicator",
     "value": "column",
     "op": "write"
    },
    {
     "gate": "write_indicator",
     "value": "encoding",
     "op": "read"
    },
    {
     "gate": "write_indicator",
     "value": "indention",
     "op": "write"
    },
    {
     "gate": "write_indicator",
     "value": "open_ended",
     "op": "write"
    },
    {
     "gate": "write_indicator",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "write_indicator",
     "value": "whitespace",
     "op": "write"
    },
    {
     "gate": "write_indent",
     "value": "column",
     "op": "write"
    },
    {
     "gate": "write_indent",
     "value": "encoding",
     "op": "read"
    },
    {
     "gate": "write_indent",
     "value": "indent",
     "op": "read"
    },
    {
     "gate": "write_indent",
     "value": "indention",
     "op": "read"
    },
    {
     "gate": "write_indent",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "write_indent",
     "value": "whitespace",
     "op": "write"
    },
    {
     "gate": "write_line_break",
     "value": "best_line_break",
     "op": "read"
    },
    {
     "gate": "write_line_break",
     "value": "column",
     "op": "write"
    },
    {
     "gate": "write_line_break",
     "value": "encoding",
     "op": "read"
    },
    {
     "gate": "write_line_break",
     "value": "indention",
     "op": "write"
    },
    {
     "gate": "write_line_break",
     "value": "line",
     "op": "write"
    },
    {
     "gate": "write_line_break",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "write_line_break",
     "value": "whitespace",
     "op": "write"
    },
    {
     "gate": "write_version_directive",
     "value": "encoding",
     "op": "read"
    },
    {
     "gate": "write_version_directive",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "write_tag_directive",
     "value": "encoding",
     "op": "read"
    },
    {
     "gate": "write_tag_directive",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "write_single_quoted",
     "value": "best_width",
     "op": "read"
    },
    {
     "gate": "write_single_quoted",
     "value": "column",
     "op": "write"
    },
    {
     "gate": "write_single_quoted",
     "value": "encoding",
     "op": "read"
    },
    {
     "gate": "write_single_quoted",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "write_double_quoted",
     "value": "ESCAPE_REPLACEMENTS",
     "op": "read"
    },
    {
     "gate": "write_double_quoted",
     "value": "allow_unicode",
     "op": "read"
    },
    {
     "gate": "write_double_quoted",
     "value": "best_width",
     "op": "read"
    },
    {
     "gate": "write_double_quoted",
     "value": "column",
     "op": "write"
    },
    {
     "gate": "write_double_quoted",
     "value": "encoding",
     "op": "read"
    },
    {
     "gate": "write_double_quoted",
     "value": "indention",
     "op": "write"
    },
    {
     "gate": "write_double_quoted",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "write_double_quoted",
     "value": "whitespace",
     "op": "write"
    },
    {
     "gate": "determine_block_hints",
     "value": "best_indent",
     "op": "read"
    },
    {
     "gate": "write_folded",
     "value": "best_width",
     "op": "read"
    },
    {
     "gate": "write_folded",
     "value": "column",
     "op": "write"
    },
    {
     "gate": "write_folded",
     "value": "encoding",
     "op": "read"
    },
    {
     "gate": "write_folded",
     "value": "open_ended",
     "op": "write"
    },
    {
     "gate": "write_folded",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "write_literal",
     "value": "encoding",
     "op": "read"
    },
    {
     "gate": "write_literal",
     "value": "open_ended",
     "op": "write"
    },
    {
     "gate": "write_literal",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "write_plain",
     "value": "best_width",
     "op": "read"
    },
    {
     "gate": "write_plain",
     "value": "column",
     "op": "write"
    },
    {
     "gate": "write_plain",
     "value": "encoding",
     "op": "read"
    },
    {
     "gate": "write_plain",
     "value": "indention",
     "op": "write"
    },
    {
     "gate": "write_plain",
     "value": "open_ended",
     "op": "write"
    },
    {
     "gate": "write_plain",
     "value": "root_context",
     "op": "read"
    },
    {
     "gate": "write_plain",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "write_plain",
     "value": "whitespace",
     "op": "write"
    }
   ]
  },
  "Mark": {
   "name": "Mark",
   "module": "error",
   "lines": 36,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "__init__",
     "lines": 7,
     "vis": "internal",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "get_snippet",
     "lines": 22,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__str__",
     "lines": 7,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "buffer",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "column",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "index",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "line",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "name",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "pointer",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "__str__",
     "to": "get_snippet",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "buffer",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "column",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "index",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "line",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "name",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "pointer",
     "op": "write"
    },
    {
     "gate": "get_snippet",
     "value": "buffer",
     "op": "read"
    },
    {
     "gate": "get_snippet",
     "value": "pointer",
     "op": "read"
    },
    {
     "gate": "__str__",
     "value": "column",
     "op": "read"
    },
    {
     "gate": "__str__",
     "value": "line",
     "op": "read"
    },
    {
     "gate": "__str__",
     "value": "name",
     "op": "read"
    }
   ]
  },
  "YAMLError": {
   "name": "YAMLError",
   "module": "error",
   "lines": 0,
   "doc": null,
   "bases": [
    "Exception"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "MarkedYAMLError": {
   "name": "MarkedYAMLError",
   "module": "error",
   "lines": 24,
   "doc": null,
   "bases": [
    "YAMLError"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 7,
     "vis": "internal",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__str__",
     "lines": 17,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "context",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "context_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "note",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "problem",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "problem_mark",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "context",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "context_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "note",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "problem",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "problem_mark",
     "op": "write"
    },
    {
     "gate": "__str__",
     "value": "context",
     "op": "read"
    },
    {
     "gate": "__str__",
     "value": "context_mark",
     "op": "read"
    },
    {
     "gate": "__str__",
     "value": "note",
     "op": "read"
    },
    {
     "gate": "__str__",
     "value": "problem",
     "op": "read"
    },
    {
     "gate": "__str__",
     "value": "problem_mark",
     "op": "read"
    }
   ]
  },
  "Event": {
   "name": "Event",
   "module": "events",
   "lines": 9,
   "doc": null,
   "bases": [
    "object"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 3,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__repr__",
     "lines": 6,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    }
   ]
  },
  "NodeEvent": {
   "name": "NodeEvent",
   "module": "events",
   "lines": 4,
   "doc": null,
   "bases": [
    "Event"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 4,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "anchor",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "anchor",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    }
   ]
  },
  "CollectionStartEvent": {
   "name": "CollectionStartEvent",
   "module": "events",
   "lines": 8,
   "doc": null,
   "bases": [
    "NodeEvent"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 8,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "anchor",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "flow_style",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "implicit",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "tag",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "anchor",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "flow_style",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "implicit",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "tag",
     "op": "write"
    }
   ]
  },
  "CollectionEndEvent": {
   "name": "CollectionEndEvent",
   "module": "events",
   "lines": 0,
   "doc": null,
   "bases": [
    "Event"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "StreamStartEvent": {
   "name": "StreamStartEvent",
   "module": "events",
   "lines": 4,
   "doc": null,
   "bases": [
    "Event"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 4,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "encoding",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "encoding",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    }
   ]
  },
  "StreamEndEvent": {
   "name": "StreamEndEvent",
   "module": "events",
   "lines": 0,
   "doc": null,
   "bases": [
    "Event"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "DocumentStartEvent": {
   "name": "DocumentStartEvent",
   "module": "events",
   "lines": 7,
   "doc": null,
   "bases": [
    "Event"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 7,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "explicit",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "tags",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "version",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "explicit",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "tags",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "version",
     "op": "write"
    }
   ]
  },
  "DocumentEndEvent": {
   "name": "DocumentEndEvent",
   "module": "events",
   "lines": 5,
   "doc": null,
   "bases": [
    "Event"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 5,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "explicit",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "explicit",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    }
   ]
  },
  "AliasEvent": {
   "name": "AliasEvent",
   "module": "events",
   "lines": 0,
   "doc": null,
   "bases": [
    "NodeEvent"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "ScalarEvent": {
   "name": "ScalarEvent",
   "module": "events",
   "lines": 9,
   "doc": null,
   "bases": [
    "NodeEvent"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 9,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "anchor",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "implicit",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "style",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "tag",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "value",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "anchor",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "implicit",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "style",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "tag",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "value",
     "op": "write"
    }
   ]
  },
  "SequenceStartEvent": {
   "name": "SequenceStartEvent",
   "module": "events",
   "lines": 0,
   "doc": null,
   "bases": [
    "CollectionStartEvent"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "SequenceEndEvent": {
   "name": "SequenceEndEvent",
   "module": "events",
   "lines": 0,
   "doc": null,
   "bases": [
    "CollectionEndEvent"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "MappingStartEvent": {
   "name": "MappingStartEvent",
   "module": "events",
   "lines": 0,
   "doc": null,
   "bases": [
    "CollectionStartEvent"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "MappingEndEvent": {
   "name": "MappingEndEvent",
   "module": "events",
   "lines": 0,
   "doc": null,
   "bases": [
    "CollectionEndEvent"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "BaseLoader": {
   "name": "BaseLoader",
   "module": "loader",
   "lines": 7,
   "doc": null,
   "bases": [
    "Reader",
    "Scanner",
    "Parser",
    "Composer",
    "BaseConstructor",
    "BaseResolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 7,
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
  "FullLoader": {
   "name": "FullLoader",
   "module": "loader",
   "lines": 7,
   "doc": null,
   "bases": [
    "Reader",
    "Scanner",
    "Parser",
    "Composer",
    "FullConstructor",
    "Resolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 7,
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
  "SafeLoader": {
   "name": "SafeLoader",
   "module": "loader",
   "lines": 7,
   "doc": null,
   "bases": [
    "Reader",
    "Scanner",
    "Parser",
    "Composer",
    "SafeConstructor",
    "Resolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 7,
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
  "Loader": {
   "name": "Loader",
   "module": "loader",
   "lines": 7,
   "doc": null,
   "bases": [
    "Reader",
    "Scanner",
    "Parser",
    "Composer",
    "Constructor",
    "Resolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 7,
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
  "UnsafeLoader": {
   "name": "UnsafeLoader",
   "module": "loader",
   "lines": 7,
   "doc": null,
   "bases": [
    "Reader",
    "Scanner",
    "Parser",
    "Composer",
    "Constructor",
    "Resolver"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 7,
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
  "Node": {
   "name": "Node",
   "module": "nodes",
   "lines": 21,
   "doc": null,
   "bases": [
    "object"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 5,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__repr__",
     "lines": 16,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "tag",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "value",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "tag",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "value",
     "op": "write"
    },
    {
     "gate": "__repr__",
     "value": "tag",
     "op": "read"
    },
    {
     "gate": "__repr__",
     "value": "value",
     "op": "read"
    }
   ]
  },
  "ScalarNode": {
   "name": "ScalarNode",
   "module": "nodes",
   "lines": 7,
   "doc": null,
   "bases": [
    "Node"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 7,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "style",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "tag",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "value",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "style",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "tag",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "value",
     "op": "write"
    }
   ]
  },
  "CollectionNode": {
   "name": "CollectionNode",
   "module": "nodes",
   "lines": 7,
   "doc": null,
   "bases": [
    "Node"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 7,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "flow_style",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "tag",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "value",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "flow_style",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "tag",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "value",
     "op": "write"
    }
   ]
  },
  "SequenceNode": {
   "name": "SequenceNode",
   "module": "nodes",
   "lines": 0,
   "doc": null,
   "bases": [
    "CollectionNode"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "MappingNode": {
   "name": "MappingNode",
   "module": "nodes",
   "lines": 0,
   "doc": null,
   "bases": [
    "CollectionNode"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "ParserError": {
   "name": "ParserError",
   "module": "parser",
   "lines": 0,
   "doc": null,
   "bases": [
    "MarkedYAMLError"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "Parser": {
   "name": "Parser",
   "module": "parser",
   "lines": 432,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "__init__",
     "lines": 7,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "dispose",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_event",
     "lines": 12,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "peek_event",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "get_event",
     "lines": 8,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_stream_start",
     "lines": 11,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_implicit_document_start",
     "lines": 19,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_document_start",
     "lines": 30,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_document_end",
     "lines": 17,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_document_content",
     "lines": 8,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "process_directives",
     "lines": 30,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_block_node",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_flow_node",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_block_node_or_indentless_sequence",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_node",
     "lines": 100,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_block_sequence_first_entry",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_block_sequence_entry",
     "lines": 18,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_indentless_sequence_entry",
     "lines": 14,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_block_mapping_first_key",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_block_mapping_key",
     "lines": 18,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_block_mapping_value",
     "lines": 13,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_flow_sequence_first_entry",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_flow_sequence_entry",
     "lines": 25,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_flow_sequence_entry_mapping_key",
     "lines": 9,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_flow_sequence_entry_mapping_value",
     "lines": 13,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_flow_sequence_entry_mapping_end",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_flow_mapping_first_key",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_flow_mapping_key",
     "lines": 26,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_flow_mapping_value",
     "lines": 13,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "parse_flow_mapping_empty_value",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "process_empty_scalar",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "current_event",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "marks",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "state",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "states",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "tag_handles",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "yaml_version",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "DEFAULT_TAGS",
     "kind": "classvar",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "__init__",
     "to": "parse_stream_start",
     "kind": "self"
    },
    {
     "from": "parse_stream_start",
     "to": "parse_implicit_document_start",
     "kind": "self"
    },
    {
     "from": "parse_implicit_document_start",
     "to": "parse_block_node",
     "kind": "self"
    },
    {
     "from": "parse_implicit_document_start",
     "to": "parse_document_end",
     "kind": "self"
    },
    {
     "from": "parse_implicit_document_start",
     "to": "parse_document_start",
     "kind": "self"
    },
    {
     "from": "parse_document_start",
     "to": "parse_document_content",
     "kind": "self"
    },
    {
     "from": "parse_document_start",
     "to": "process_directives",
     "kind": "self"
    },
    {
     "from": "parse_document_start",
     "to": "parse_document_end",
     "kind": "self"
    },
    {
     "from": "parse_document_end",
     "to": "parse_document_start",
     "kind": "self"
    },
    {
     "from": "parse_document_content",
     "to": "process_empty_scalar",
     "kind": "self"
    },
    {
     "from": "parse_document_content",
     "to": "parse_block_node",
     "kind": "self"
    },
    {
     "from": "parse_block_node",
     "to": "parse_node",
     "kind": "self"
    },
    {
     "from": "parse_flow_node",
     "to": "parse_node",
     "kind": "self"
    },
    {
     "from": "parse_block_node_or_indentless_sequence",
     "to": "parse_node",
     "kind": "self"
    },
    {
     "from": "parse_node",
     "to": "parse_indentless_sequence_entry",
     "kind": "self"
    },
    {
     "from": "parse_node",
     "to": "parse_flow_sequence_first_entry",
     "kind": "self"
    },
    {
     "from": "parse_node",
     "to": "parse_flow_mapping_first_key",
     "kind": "self"
    },
    {
     "from": "parse_node",
     "to": "parse_block_sequence_first_entry",
     "kind": "self"
    },
    {
     "from": "parse_node",
     "to": "parse_block_mapping_first_key",
     "kind": "self"
    },
    {
     "from": "parse_block_sequence_first_entry",
     "to": "parse_block_sequence_entry",
     "kind": "self"
    },
    {
     "from": "parse_block_sequence_entry",
     "to": "parse_block_node",
     "kind": "self"
    },
    {
     "from": "parse_block_sequence_entry",
     "to": "process_empty_scalar",
     "kind": "self"
    },
    {
     "from": "parse_indentless_sequence_entry",
     "to": "parse_block_node",
     "kind": "self"
    },
    {
     "from": "parse_indentless_sequence_entry",
     "to": "process_empty_scalar",
     "kind": "self"
    },
    {
     "from": "parse_block_mapping_first_key",
     "to": "parse_block_mapping_key",
     "kind": "self"
    },
    {
     "from": "parse_block_mapping_key",
     "to": "parse_block_mapping_value",
     "kind": "self"
    },
    {
     "from": "parse_block_mapping_key",
     "to": "parse_block_node_or_indentless_sequence",
     "kind": "self"
    },
    {
     "from": "parse_block_mapping_key",
     "to": "process_empty_scalar",
     "kind": "self"
    },
    {
     "from": "parse_block_mapping_value",
     "to": "parse_block_mapping_key",
     "kind": "self"
    },
    {
     "from": "parse_block_mapping_value",
     "to": "process_empty_scalar",
     "kind": "self"
    },
    {
     "from": "parse_block_mapping_value",
     "to": "parse_block_node_or_indentless_sequence",
     "kind": "self"
    },
    {
     "from": "parse_flow_sequence_first_entry",
     "to": "parse_flow_sequence_entry",
     "kind": "self"
    },
    {
     "from": "parse_flow_sequence_entry",
     "to": "parse_flow_sequence_entry_mapping_key",
     "kind": "self"
    },
    {
     "from": "parse_flow_sequence_entry",
     "to": "parse_flow_node",
     "kind": "self"
    },
    {
     "from": "parse_flow_sequence_entry_mapping_key",
     "to": "parse_flow_sequence_entry_mapping_value",
     "kind": "self"
    },
    {
     "from": "parse_flow_sequence_entry_mapping_key",
     "to": "parse_flow_node",
     "kind": "self"
    },
    {
     "from": "parse_flow_sequence_entry_mapping_key",
     "to": "process_empty_scalar",
     "kind": "self"
    },
    {
     "from": "parse_flow_sequence_entry_mapping_value",
     "to": "parse_flow_sequence_entry_mapping_end",
     "kind": "self"
    },
    {
     "from": "parse_flow_sequence_entry_mapping_value",
     "to": "process_empty_scalar",
     "kind": "self"
    },
    {
     "from": "parse_flow_sequence_entry_mapping_value",
     "to": "parse_flow_node",
     "kind": "self"
    },
    {
     "from": "parse_flow_sequence_entry_mapping_end",
     "to": "parse_flow_sequence_entry",
     "kind": "self"
    },
    {
     "from": "parse_flow_mapping_first_key",
     "to": "parse_flow_mapping_key",
     "kind": "self"
    },
    {
     "from": "parse_flow_mapping_key",
     "to": "parse_flow_mapping_value",
     "kind": "self"
    },
    {
     "from": "parse_flow_mapping_key",
     "to": "parse_flow_node",
     "kind": "self"
    },
    {
     "from": "parse_flow_mapping_key",
     "to": "process_empty_scalar",
     "kind": "self"
    },
    {
     "from": "parse_flow_mapping_key",
     "to": "parse_flow_mapping_empty_value",
     "kind": "self"
    },
    {
     "from": "parse_flow_mapping_value",
     "to": "parse_flow_mapping_key",
     "kind": "self"
    },
    {
     "from": "parse_flow_mapping_value",
     "to": "process_empty_scalar",
     "kind": "self"
    },
    {
     "from": "parse_flow_mapping_value",
     "to": "parse_flow_node",
     "kind": "self"
    },
    {
     "from": "parse_flow_mapping_empty_value",
     "to": "parse_flow_mapping_key",
     "kind": "self"
    },
    {
     "from": "parse_flow_mapping_empty_value",
     "to": "process_empty_scalar",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "current_event",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "marks",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "states",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "tag_handles",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "yaml_version",
     "op": "write"
    },
    {
     "gate": "dispose",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "dispose",
     "value": "states",
     "op": "write"
    },
    {
     "gate": "check_event",
     "value": "current_event",
     "op": "write"
    },
    {
     "gate": "check_event",
     "value": "state",
     "op": "read"
    },
    {
     "gate": "peek_event",
     "value": "current_event",
     "op": "write"
    },
    {
     "gate": "peek_event",
     "value": "state",
     "op": "read"
    },
    {
     "gate": "get_event",
     "value": "current_event",
     "op": "write"
    },
    {
     "gate": "get_event",
     "value": "state",
     "op": "read"
    },
    {
     "gate": "parse_stream_start",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_implicit_document_start",
     "value": "DEFAULT_TAGS",
     "op": "read"
    },
    {
     "gate": "parse_implicit_document_start",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_implicit_document_start",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "parse_implicit_document_start",
     "value": "tag_handles",
     "op": "write"
    },
    {
     "gate": "parse_document_start",
     "value": "marks",
     "op": "read"
    },
    {
     "gate": "parse_document_start",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_document_start",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "parse_document_end",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_document_content",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_document_content",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "process_directives",
     "value": "DEFAULT_TAGS",
     "op": "read"
    },
    {
     "gate": "process_directives",
     "value": "tag_handles",
     "op": "write"
    },
    {
     "gate": "process_directives",
     "value": "yaml_version",
     "op": "write"
    },
    {
     "gate": "parse_node",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_node",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "parse_node",
     "value": "tag_handles",
     "op": "read"
    },
    {
     "gate": "parse_block_sequence_first_entry",
     "value": "marks",
     "op": "read"
    },
    {
     "gate": "parse_block_sequence_entry",
     "value": "marks",
     "op": "read"
    },
    {
     "gate": "parse_block_sequence_entry",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_block_sequence_entry",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "parse_indentless_sequence_entry",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_indentless_sequence_entry",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "parse_block_mapping_first_key",
     "value": "marks",
     "op": "read"
    },
    {
     "gate": "parse_block_mapping_key",
     "value": "marks",
     "op": "read"
    },
    {
     "gate": "parse_block_mapping_key",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_block_mapping_key",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "parse_block_mapping_value",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_block_mapping_value",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "parse_flow_sequence_first_entry",
     "value": "marks",
     "op": "read"
    },
    {
     "gate": "parse_flow_sequence_entry",
     "value": "marks",
     "op": "read"
    },
    {
     "gate": "parse_flow_sequence_entry",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_flow_sequence_entry",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "parse_flow_sequence_entry_mapping_key",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_flow_sequence_entry_mapping_key",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "parse_flow_sequence_entry_mapping_value",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_flow_sequence_entry_mapping_value",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "parse_flow_sequence_entry_mapping_end",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_flow_mapping_first_key",
     "value": "marks",
     "op": "read"
    },
    {
     "gate": "parse_flow_mapping_key",
     "value": "marks",
     "op": "read"
    },
    {
     "gate": "parse_flow_mapping_key",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_flow_mapping_key",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "parse_flow_mapping_value",
     "value": "state",
     "op": "write"
    },
    {
     "gate": "parse_flow_mapping_value",
     "value": "states",
     "op": "read"
    },
    {
     "gate": "parse_flow_mapping_empty_value",
     "value": "state",
     "op": "write"
    }
   ]
  },
  "ReaderError": {
   "name": "ReaderError",
   "module": "reader",
   "lines": 17,
   "doc": null,
   "bases": [
    "YAMLError"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 6,
     "vis": "internal",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__str__",
     "lines": 11,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "character",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "encoding",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "name",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "position",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "reason",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "character",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "encoding",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "name",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "position",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "reason",
     "op": "write"
    },
    {
     "gate": "__str__",
     "value": "character",
     "op": "read"
    },
    {
     "gate": "__str__",
     "value": "encoding",
     "op": "read"
    },
    {
     "gate": "__str__",
     "value": "name",
     "op": "read"
    },
    {
     "gate": "__str__",
     "value": "position",
     "op": "read"
    },
    {
     "gate": "__str__",
     "value": "reason",
     "op": "read"
    }
   ]
  },
  "Reader": {
   "name": "Reader",
   "module": "reader",
   "lines": 118,
   "doc": null,
   "bases": [
    "object"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 27,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "peek",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "prefix",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "forward",
     "lines": 14,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "get_mark",
     "lines": 7,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "determine_encoding",
     "lines": 14,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_printable",
     "lines": 7,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "update",
     "lines": 30,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "update_raw",
     "lines": 9,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "buffer",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "column",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "encoding",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "eof",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "index",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "line",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "name",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "pointer",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "raw_buffer",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "raw_decode",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "stream",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "stream_pointer",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "NON_PRINTABLE",
     "kind": "classvar",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "__init__",
     "to": "check_printable",
     "kind": "self"
    },
    {
     "from": "__init__",
     "to": "determine_encoding",
     "kind": "self"
    },
    {
     "from": "peek",
     "to": "update",
     "kind": "self"
    },
    {
     "from": "prefix",
     "to": "update",
     "kind": "self"
    },
    {
     "from": "forward",
     "to": "update",
     "kind": "self"
    },
    {
     "from": "determine_encoding",
     "to": "update",
     "kind": "self"
    },
    {
     "from": "determine_encoding",
     "to": "update_raw",
     "kind": "self"
    },
    {
     "from": "update",
     "to": "check_printable",
     "kind": "self"
    },
    {
     "from": "update",
     "to": "update_raw",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "buffer",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "column",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "encoding",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "eof",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "index",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "line",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "name",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "pointer",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "raw_buffer",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "raw_decode",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "stream",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "stream_pointer",
     "op": "write"
    },
    {
     "gate": "peek",
     "value": "buffer",
     "op": "read"
    },
    {
     "gate": "peek",
     "value": "pointer",
     "op": "read"
    },
    {
     "gate": "prefix",
     "value": "buffer",
     "op": "read"
    },
    {
     "gate": "prefix",
     "value": "pointer",
     "op": "read"
    },
    {
     "gate": "forward",
     "value": "buffer",
     "op": "read"
    },
    {
     "gate": "forward",
     "value": "column",
     "op": "write"
    },
    {
     "gate": "forward",
     "value": "index",
     "op": "write"
    },
    {
     "gate": "forward",
     "value": "line",
     "op": "write"
    },
    {
     "gate": "forward",
     "value": "pointer",
     "op": "write"
    },
    {
     "gate": "get_mark",
     "value": "buffer",
     "op": "read"
    },
    {
     "gate": "get_mark",
     "value": "column",
     "op": "read"
    },
    {
     "gate": "get_mark",
     "value": "index",
     "op": "read"
    },
    {
     "gate": "get_mark",
     "value": "line",
     "op": "read"
    },
    {
     "gate": "get_mark",
     "value": "name",
     "op": "read"
    },
    {
     "gate": "get_mark",
     "value": "pointer",
     "op": "read"
    },
    {
     "gate": "get_mark",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "determine_encoding",
     "value": "encoding",
     "op": "write"
    },
    {
     "gate": "determine_encoding",
     "value": "eof",
     "op": "read"
    },
    {
     "gate": "determine_encoding",
     "value": "raw_buffer",
     "op": "read"
    },
    {
     "gate": "determine_encoding",
     "value": "raw_decode",
     "op": "write"
    },
    {
     "gate": "check_printable",
     "value": "NON_PRINTABLE",
     "op": "read"
    },
    {
     "gate": "check_printable",
     "value": "buffer",
     "op": "read"
    },
    {
     "gate": "check_printable",
     "value": "index",
     "op": "read"
    },
    {
     "gate": "check_printable",
     "value": "name",
     "op": "read"
    },
    {
     "gate": "check_printable",
     "value": "pointer",
     "op": "read"
    },
    {
     "gate": "update",
     "value": "buffer",
     "op": "write"
    },
    {
     "gate": "update",
     "value": "eof",
     "op": "read"
    },
    {
     "gate": "update",
     "value": "name",
     "op": "read"
    },
    {
     "gate": "update",
     "value": "pointer",
     "op": "write"
    },
    {
     "gate": "update",
     "value": "raw_buffer",
     "op": "write"
    },
    {
     "gate": "update",
     "value": "raw_decode",
     "op": "read"
    },
    {
     "gate": "update",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "update",
     "value": "stream_pointer",
     "op": "read"
    },
    {
     "gate": "update_raw",
     "value": "eof",
     "op": "write"
    },
    {
     "gate": "update_raw",
     "value": "raw_buffer",
     "op": "write"
    },
    {
     "gate": "update_raw",
     "value": "stream",
     "op": "read"
    },
    {
     "gate": "update_raw",
     "value": "stream_pointer",
     "op": "write"
    }
   ]
  },
  "RepresenterError": {
   "name": "RepresenterError",
   "module": "representer",
   "lines": 0,
   "doc": null,
   "bases": [
    "YAMLError"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "BaseRepresenter": {
   "name": "BaseRepresenter",
   "module": "representer",
   "lines": 105,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "__init__",
     "lines": 7,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_data",
     "lines": 31,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "add_representer",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "add_multi_representer",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_scalar",
     "lines": 7,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_sequence",
     "lines": 17,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_mapping",
     "lines": 27,
     "vis": "internal",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "ignore_aliases",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "alias_key",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "default_flow_style",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "default_style",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "object_keeper",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "represented_objects",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "sort_keys",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "yaml_multi_representers",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "yaml_representers",
     "kind": "classvar",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "represent",
     "to": "represent_data",
     "kind": "self"
    },
    {
     "from": "represent_data",
     "to": "ignore_aliases",
     "kind": "self"
    },
    {
     "from": "represent_sequence",
     "to": "represent_data",
     "kind": "self"
    },
    {
     "from": "represent_mapping",
     "to": "represent_data",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "alias_key",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "default_flow_style",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "default_style",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "object_keeper",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "represented_objects",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "sort_keys",
     "op": "write"
    },
    {
     "gate": "represent",
     "value": "alias_key",
     "op": "write"
    },
    {
     "gate": "represent",
     "value": "object_keeper",
     "op": "write"
    },
    {
     "gate": "represent",
     "value": "represented_objects",
     "op": "write"
    },
    {
     "gate": "represent_data",
     "value": "alias_key",
     "op": "write"
    },
    {
     "gate": "represent_data",
     "value": "object_keeper",
     "op": "read"
    },
    {
     "gate": "represent_data",
     "value": "represented_objects",
     "op": "read"
    },
    {
     "gate": "represent_data",
     "value": "yaml_multi_representers",
     "op": "read"
    },
    {
     "gate": "represent_data",
     "value": "yaml_representers",
     "op": "read"
    },
    {
     "gate": "represent_scalar",
     "value": "alias_key",
     "op": "read"
    },
    {
     "gate": "represent_scalar",
     "value": "default_style",
     "op": "read"
    },
    {
     "gate": "represent_scalar",
     "value": "represented_objects",
     "op": "read"
    },
    {
     "gate": "represent_sequence",
     "value": "alias_key",
     "op": "read"
    },
    {
     "gate": "represent_sequence",
     "value": "default_flow_style",
     "op": "read"
    },
    {
     "gate": "represent_sequence",
     "value": "represented_objects",
     "op": "read"
    },
    {
     "gate": "represent_mapping",
     "value": "alias_key",
     "op": "read"
    },
    {
     "gate": "represent_mapping",
     "value": "default_flow_style",
     "op": "read"
    },
    {
     "gate": "represent_mapping",
     "value": "represented_objects",
     "op": "read"
    },
    {
     "gate": "represent_mapping",
     "value": "sort_keys",
     "op": "read"
    }
   ]
  },
  "SafeRepresenter": {
   "name": "SafeRepresenter",
   "module": "representer",
   "lines": 74,
   "doc": null,
   "bases": [
    "BaseRepresenter"
   ],
   "gates": [
    {
     "name": "ignore_aliases",
     "lines": 7,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_none",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_str",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_binary",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_bool",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_int",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_float",
     "lines": 19,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_list",
     "lines": 9,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_dict",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_set",
     "lines": 5,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_date",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_datetime",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_yaml_object",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_undefined",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "inf_value",
     "kind": "classvar",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "represent_float",
     "value": "inf_value",
     "op": "read"
    }
   ]
  },
  "Representer": {
   "name": "Representer",
   "module": "representer",
   "lines": 86,
   "doc": null,
   "bases": [
    "SafeRepresenter"
   ],
   "gates": [
    {
     "name": "represent_complex",
     "lines": 10,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_tuple",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_name",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_module",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_object",
     "lines": 61,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "represent_ordered_dict",
     "lines": 7,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "ResolverError": {
   "name": "ResolverError",
   "module": "resolver",
   "lines": 0,
   "doc": null,
   "bases": [
    "YAMLError"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "BaseResolver": {
   "name": "BaseResolver",
   "module": "resolver",
   "lines": 137,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "__init__",
     "lines": 3,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "add_implicit_resolver",
     "lines": 10,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "add_path_resolver",
     "lines": 52,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "descend_resolver",
     "lines": 22,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "ascend_resolver",
     "lines": 5,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_resolver_prefix",
     "lines": 22,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "resolve",
     "lines": 23,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "resolver_exact_paths",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "resolver_prefix_paths",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "yaml_path_resolvers",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "DEFAULT_MAPPING_TAG",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "DEFAULT_SCALAR_TAG",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "DEFAULT_SEQUENCE_TAG",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "yaml_implicit_resolvers",
     "kind": "classvar",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "descend_resolver",
     "to": "check_resolver_prefix",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "resolver_exact_paths",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "resolver_prefix_paths",
     "op": "write"
    },
    {
     "gate": "descend_resolver",
     "value": "resolver_exact_paths",
     "op": "read"
    },
    {
     "gate": "descend_resolver",
     "value": "resolver_prefix_paths",
     "op": "read"
    },
    {
     "gate": "descend_resolver",
     "value": "yaml_path_resolvers",
     "op": "read"
    },
    {
     "gate": "ascend_resolver",
     "value": "resolver_exact_paths",
     "op": "read"
    },
    {
     "gate": "ascend_resolver",
     "value": "resolver_prefix_paths",
     "op": "read"
    },
    {
     "gate": "ascend_resolver",
     "value": "yaml_path_resolvers",
     "op": "read"
    },
    {
     "gate": "resolve",
     "value": "DEFAULT_MAPPING_TAG",
     "op": "read"
    },
    {
     "gate": "resolve",
     "value": "DEFAULT_SCALAR_TAG",
     "op": "read"
    },
    {
     "gate": "resolve",
     "value": "DEFAULT_SEQUENCE_TAG",
     "op": "read"
    },
    {
     "gate": "resolve",
     "value": "resolver_exact_paths",
     "op": "read"
    },
    {
     "gate": "resolve",
     "value": "yaml_implicit_resolvers",
     "op": "read"
    },
    {
     "gate": "resolve",
     "value": "yaml_path_resolvers",
     "op": "read"
    }
   ]
  },
  "Resolver": {
   "name": "Resolver",
   "module": "resolver",
   "lines": 0,
   "doc": null,
   "bases": [
    "BaseResolver"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "ScannerError": {
   "name": "ScannerError",
   "module": "scanner",
   "lines": 0,
   "doc": null,
   "bases": [
    "MarkedYAMLError"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "SimpleKey": {
   "name": "SimpleKey",
   "module": "scanner",
   "lines": 7,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "__init__",
     "lines": 7,
     "vis": "internal",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "column",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "index",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "line",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "required",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "token_number",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "column",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "index",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "line",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "required",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "token_number",
     "op": "write"
    }
   ]
  },
  "Scanner": {
   "name": "Scanner",
   "module": "scanner",
   "lines": 1276,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "__init__",
     "lines": 62,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": "Initialize the scanner."
    },
    {
     "name": "check_token",
     "lines": 11,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "peek_token",
     "lines": 9,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "get_token",
     "lines": 7,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "need_more_tokens",
     "lines": 10,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_more_tokens",
     "lines": 105,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "next_possible_simple_key",
     "lines": 14,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "stale_possible_simple_keys",
     "lines": 15,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "save_possible_simple_key",
     "lines": 16,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "remove_possible_simple_key",
     "lines": 10,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "unwind_indent",
     "lines": 23,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "add_indent",
     "lines": 7,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_stream_start",
     "lines": 10,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_stream_end",
     "lines": 18,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_directive",
     "lines": 11,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_document_start",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_document_end",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_document_indicator",
     "lines": 15,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_flow_sequence_start",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_flow_mapping_start",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_flow_collection_start",
     "lines": 16,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_flow_sequence_end",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_flow_mapping_end",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_flow_collection_end",
     "lines": 16,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_flow_entry",
     "lines": 13,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_block_entry",
     "lines": 32,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_key",
     "lines": 27,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_value",
     "lines": 55,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_alias",
     "lines": 10,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_anchor",
     "lines": 10,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_tag",
     "lines": 10,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_literal",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_folded",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_block_scalar",
     "lines": 10,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_single",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_double",
     "lines": 2,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_flow_scalar",
     "lines": 10,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "fetch_plain",
     "lines": 12,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_directive",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_document_start",
     "lines": 7,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_document_end",
     "lines": 7,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_block_entry",
     "lines": 4,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_key",
     "lines": 9,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_value",
     "lines": 9,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "check_plain",
     "lines": 18,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_to_next_token",
     "lines": 34,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_directive",
     "lines": 18,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_directive_name",
     "lines": 20,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_yaml_directive_value",
     "lines": 16,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_yaml_directive_number",
     "lines": 12,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_tag_directive_value",
     "lines": 9,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_tag_directive_handle",
     "lines": 8,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_tag_directive_prefix",
     "lines": 8,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_directive_ignored_line",
     "lines": 13,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_anchor",
     "lines": 35,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_tag",
     "lines": 40,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_block_scalar",
     "lines": 75,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_block_scalar_indicators",
     "lines": 39,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_block_scalar_ignored_line",
     "lines": 13,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_block_scalar_indentation",
     "lines": 14,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_block_scalar_breaks",
     "lines": 12,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_flow_scalar",
     "lines": 23,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_flow_scalar_non_spaces",
     "lines": 42,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_flow_scalar_spaces",
     "lines": 23,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_flow_scalar_breaks",
     "lines": 17,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_plain",
     "lines": 40,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_plain_spaces",
     "lines": 36,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_tag_handle",
     "lines": 23,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_tag_uri",
     "lines": 24,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_uri_escapes",
     "lines": 18,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "scan_line_break",
     "lines": 20,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "allow_simple_key",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "done",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "flow_level",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "indent",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "indents",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "possible_simple_keys",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "tokens",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "tokens_taken",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "ESCAPE_CODES",
     "kind": "classvar",
     "mutated": false
    },
    {
     "name": "ESCAPE_REPLACEMENTS",
     "kind": "classvar",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "__init__",
     "to": "fetch_stream_start",
     "kind": "self"
    },
    {
     "from": "check_token",
     "to": "need_more_tokens",
     "kind": "self"
    },
    {
     "from": "check_token",
     "to": "fetch_more_tokens",
     "kind": "self"
    },
    {
     "from": "peek_token",
     "to": "need_more_tokens",
     "kind": "self"
    },
    {
     "from": "peek_token",
     "to": "fetch_more_tokens",
     "kind": "self"
    },
    {
     "from": "get_token",
     "to": "need_more_tokens",
     "kind": "self"
    },
    {
     "from": "get_token",
     "to": "fetch_more_tokens",
     "kind": "self"
    },
    {
     "from": "need_more_tokens",
     "to": "stale_possible_simple_keys",
     "kind": "self"
    },
    {
     "from": "need_more_tokens",
     "to": "next_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "scan_to_next_token",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "stale_possible_simple_keys",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "unwind_indent",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "check_plain",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_stream_end",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "check_directive",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_directive",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "check_document_start",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_document_start",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "check_document_end",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_document_end",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_flow_sequence_start",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_flow_mapping_start",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_flow_sequence_end",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_flow_mapping_end",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_flow_entry",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "check_block_entry",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_block_entry",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "check_key",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_key",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "check_value",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_value",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_alias",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_anchor",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_tag",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_literal",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_folded",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_single",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_double",
     "kind": "self"
    },
    {
     "from": "fetch_more_tokens",
     "to": "fetch_plain",
     "kind": "self"
    },
    {
     "from": "save_possible_simple_key",
     "to": "remove_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_stream_end",
     "to": "unwind_indent",
     "kind": "self"
    },
    {
     "from": "fetch_stream_end",
     "to": "remove_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_directive",
     "to": "unwind_indent",
     "kind": "self"
    },
    {
     "from": "fetch_directive",
     "to": "remove_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_directive",
     "to": "scan_directive",
     "kind": "self"
    },
    {
     "from": "fetch_document_start",
     "to": "fetch_document_indicator",
     "kind": "self"
    },
    {
     "from": "fetch_document_end",
     "to": "fetch_document_indicator",
     "kind": "self"
    },
    {
     "from": "fetch_document_indicator",
     "to": "unwind_indent",
     "kind": "self"
    },
    {
     "from": "fetch_document_indicator",
     "to": "remove_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_flow_sequence_start",
     "to": "fetch_flow_collection_start",
     "kind": "self"
    },
    {
     "from": "fetch_flow_mapping_start",
     "to": "fetch_flow_collection_start",
     "kind": "self"
    },
    {
     "from": "fetch_flow_collection_start",
     "to": "save_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_flow_sequence_end",
     "to": "fetch_flow_collection_end",
     "kind": "self"
    },
    {
     "from": "fetch_flow_mapping_end",
     "to": "fetch_flow_collection_end",
     "kind": "self"
    },
    {
     "from": "fetch_flow_collection_end",
     "to": "remove_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_flow_entry",
     "to": "remove_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_block_entry",
     "to": "remove_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_block_entry",
     "to": "add_indent",
     "kind": "self"
    },
    {
     "from": "fetch_key",
     "to": "remove_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_key",
     "to": "add_indent",
     "kind": "self"
    },
    {
     "from": "fetch_value",
     "to": "remove_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_value",
     "to": "add_indent",
     "kind": "self"
    },
    {
     "from": "fetch_alias",
     "to": "save_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_alias",
     "to": "scan_anchor",
     "kind": "self"
    },
    {
     "from": "fetch_anchor",
     "to": "save_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_anchor",
     "to": "scan_anchor",
     "kind": "self"
    },
    {
     "from": "fetch_tag",
     "to": "save_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_tag",
     "to": "scan_tag",
     "kind": "self"
    },
    {
     "from": "fetch_literal",
     "to": "fetch_block_scalar",
     "kind": "self"
    },
    {
     "from": "fetch_folded",
     "to": "fetch_block_scalar",
     "kind": "self"
    },
    {
     "from": "fetch_block_scalar",
     "to": "remove_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_block_scalar",
     "to": "scan_block_scalar",
     "kind": "self"
    },
    {
     "from": "fetch_single",
     "to": "fetch_flow_scalar",
     "kind": "self"
    },
    {
     "from": "fetch_double",
     "to": "fetch_flow_scalar",
     "kind": "self"
    },
    {
     "from": "fetch_flow_scalar",
     "to": "save_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_flow_scalar",
     "to": "scan_flow_scalar",
     "kind": "self"
    },
    {
     "from": "fetch_plain",
     "to": "save_possible_simple_key",
     "kind": "self"
    },
    {
     "from": "fetch_plain",
     "to": "scan_plain",
     "kind": "self"
    },
    {
     "from": "scan_to_next_token",
     "to": "scan_line_break",
     "kind": "self"
    },
    {
     "from": "scan_directive",
     "to": "scan_directive_name",
     "kind": "self"
    },
    {
     "from": "scan_directive",
     "to": "scan_directive_ignored_line",
     "kind": "self"
    },
    {
     "from": "scan_directive",
     "to": "scan_yaml_directive_value",
     "kind": "self"
    },
    {
     "from": "scan_directive",
     "to": "scan_tag_directive_value",
     "kind": "self"
    },
    {
     "from": "scan_yaml_directive_value",
     "to": "scan_yaml_directive_number",
     "kind": "self"
    },
    {
     "from": "scan_tag_directive_value",
     "to": "scan_tag_directive_handle",
     "kind": "self"
    },
    {
     "from": "scan_tag_directive_value",
     "to": "scan_tag_directive_prefix",
     "kind": "self"
    },
    {
     "from": "scan_tag_directive_handle",
     "to": "scan_tag_handle",
     "kind": "self"
    },
    {
     "from": "scan_tag_directive_prefix",
     "to": "scan_tag_uri",
     "kind": "self"
    },
    {
     "from": "scan_directive_ignored_line",
     "to": "scan_line_break",
     "kind": "self"
    },
    {
     "from": "scan_tag",
     "to": "scan_tag_uri",
     "kind": "self"
    },
    {
     "from": "scan_tag",
     "to": "scan_tag_handle",
     "kind": "self"
    },
    {
     "from": "scan_block_scalar",
     "to": "scan_block_scalar_indicators",
     "kind": "self"
    },
    {
     "from": "scan_block_scalar",
     "to": "scan_block_scalar_ignored_line",
     "kind": "self"
    },
    {
     "from": "scan_block_scalar",
     "to": "scan_block_scalar_indentation",
     "kind": "self"
    },
    {
     "from": "scan_block_scalar",
     "to": "scan_block_scalar_breaks",
     "kind": "self"
    },
    {
     "from": "scan_block_scalar",
     "to": "scan_line_break",
     "kind": "self"
    },
    {
     "from": "scan_block_scalar_ignored_line",
     "to": "scan_line_break",
     "kind": "self"
    },
    {
     "from": "scan_block_scalar_indentation",
     "to": "scan_line_break",
     "kind": "self"
    },
    {
     "from": "scan_block_scalar_breaks",
     "to": "scan_line_break",
     "kind": "self"
    },
    {
     "from": "scan_flow_scalar",
     "to": "scan_flow_scalar_non_spaces",
     "kind": "self"
    },
    {
     "from": "scan_flow_scalar",
     "to": "scan_flow_scalar_spaces",
     "kind": "self"
    },
    {
     "from": "scan_flow_scalar_non_spaces",
     "to": "scan_line_break",
     "kind": "self"
    },
    {
     "from": "scan_flow_scalar_non_spaces",
     "to": "scan_flow_scalar_breaks",
     "kind": "self"
    },
    {
     "from": "scan_flow_scalar_spaces",
     "to": "scan_line_break",
     "kind": "self"
    },
    {
     "from": "scan_flow_scalar_spaces",
     "to": "scan_flow_scalar_breaks",
     "kind": "self"
    },
    {
     "from": "scan_flow_scalar_breaks",
     "to": "scan_line_break",
     "kind": "self"
    },
    {
     "from": "scan_plain",
     "to": "scan_plain_spaces",
     "kind": "self"
    },
    {
     "from": "scan_plain_spaces",
     "to": "scan_line_break",
     "kind": "self"
    },
    {
     "from": "scan_tag_uri",
     "to": "scan_uri_escapes",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "done",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "flow_level",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "indent",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "indents",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "possible_simple_keys",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "tokens",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "tokens_taken",
     "op": "write"
    },
    {
     "gate": "check_token",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "peek_token",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "get_token",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "get_token",
     "value": "tokens_taken",
     "op": "write"
    },
    {
     "gate": "need_more_tokens",
     "value": "done",
     "op": "read"
    },
    {
     "gate": "need_more_tokens",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "need_more_tokens",
     "value": "tokens_taken",
     "op": "read"
    },
    {
     "gate": "fetch_more_tokens",
     "value": "flow_level",
     "op": "read"
    },
    {
     "gate": "next_possible_simple_key",
     "value": "possible_simple_keys",
     "op": "read"
    },
    {
     "gate": "stale_possible_simple_keys",
     "value": "possible_simple_keys",
     "op": "read"
    },
    {
     "gate": "save_possible_simple_key",
     "value": "allow_simple_key",
     "op": "read"
    },
    {
     "gate": "save_possible_simple_key",
     "value": "flow_level",
     "op": "read"
    },
    {
     "gate": "save_possible_simple_key",
     "value": "indent",
     "op": "read"
    },
    {
     "gate": "save_possible_simple_key",
     "value": "possible_simple_keys",
     "op": "read"
    },
    {
     "gate": "save_possible_simple_key",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "save_possible_simple_key",
     "value": "tokens_taken",
     "op": "read"
    },
    {
     "gate": "remove_possible_simple_key",
     "value": "flow_level",
     "op": "read"
    },
    {
     "gate": "remove_possible_simple_key",
     "value": "possible_simple_keys",
     "op": "read"
    },
    {
     "gate": "unwind_indent",
     "value": "flow_level",
     "op": "read"
    },
    {
     "gate": "unwind_indent",
     "value": "indent",
     "op": "write"
    },
    {
     "gate": "unwind_indent",
     "value": "indents",
     "op": "read"
    },
    {
     "gate": "unwind_indent",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "add_indent",
     "value": "indent",
     "op": "write"
    },
    {
     "gate": "add_indent",
     "value": "indents",
     "op": "read"
    },
    {
     "gate": "fetch_stream_start",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_stream_end",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_stream_end",
     "value": "done",
     "op": "write"
    },
    {
     "gate": "fetch_stream_end",
     "value": "possible_simple_keys",
     "op": "write"
    },
    {
     "gate": "fetch_stream_end",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_directive",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_directive",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_document_indicator",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_document_indicator",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_flow_collection_start",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_flow_collection_start",
     "value": "flow_level",
     "op": "write"
    },
    {
     "gate": "fetch_flow_collection_start",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_flow_collection_end",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_flow_collection_end",
     "value": "flow_level",
     "op": "write"
    },
    {
     "gate": "fetch_flow_collection_end",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_flow_entry",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_flow_entry",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_block_entry",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_block_entry",
     "value": "flow_level",
     "op": "read"
    },
    {
     "gate": "fetch_block_entry",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_key",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_key",
     "value": "flow_level",
     "op": "read"
    },
    {
     "gate": "fetch_key",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_value",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_value",
     "value": "flow_level",
     "op": "read"
    },
    {
     "gate": "fetch_value",
     "value": "possible_simple_keys",
     "op": "read"
    },
    {
     "gate": "fetch_value",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_value",
     "value": "tokens_taken",
     "op": "read"
    },
    {
     "gate": "fetch_alias",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_alias",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_anchor",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_anchor",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_tag",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_tag",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_block_scalar",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_block_scalar",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_flow_scalar",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_flow_scalar",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "fetch_plain",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "fetch_plain",
     "value": "tokens",
     "op": "read"
    },
    {
     "gate": "check_key",
     "value": "flow_level",
     "op": "read"
    },
    {
     "gate": "check_value",
     "value": "flow_level",
     "op": "read"
    },
    {
     "gate": "check_plain",
     "value": "flow_level",
     "op": "read"
    },
    {
     "gate": "scan_to_next_token",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "scan_to_next_token",
     "value": "flow_level",
     "op": "read"
    },
    {
     "gate": "scan_block_scalar",
     "value": "indent",
     "op": "read"
    },
    {
     "gate": "scan_flow_scalar_non_spaces",
     "value": "ESCAPE_CODES",
     "op": "read"
    },
    {
     "gate": "scan_flow_scalar_non_spaces",
     "value": "ESCAPE_REPLACEMENTS",
     "op": "read"
    },
    {
     "gate": "scan_plain",
     "value": "allow_simple_key",
     "op": "write"
    },
    {
     "gate": "scan_plain",
     "value": "flow_level",
     "op": "read"
    },
    {
     "gate": "scan_plain",
     "value": "indent",
     "op": "read"
    },
    {
     "gate": "scan_plain_spaces",
     "value": "allow_simple_key",
     "op": "write"
    }
   ]
  },
  "SerializerError": {
   "name": "SerializerError",
   "module": "serializer",
   "lines": 0,
   "doc": null,
   "bases": [
    "YAMLError"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "Serializer": {
   "name": "Serializer",
   "module": "serializer",
   "lines": 87,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "__init__",
     "lines": 11,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "open",
     "lines": 8,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "close",
     "lines": 6,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "serialize",
     "lines": 13,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "anchor_node",
     "lines": 13,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "generate_anchor",
     "lines": 3,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    },
    {
     "name": "serialize_node",
     "lines": 33,
     "vis": "private",
     "dunder": false,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "anchors",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "closed",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "last_anchor_id",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "serialized_nodes",
     "kind": "field",
     "mutated": true
    },
    {
     "name": "use_encoding",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "use_explicit_end",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "use_explicit_start",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "use_tags",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "use_version",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "ANCHOR_TEMPLATE",
     "kind": "classvar",
     "mutated": false
    }
   ],
   "wires": [
    {
     "from": "serialize",
     "to": "anchor_node",
     "kind": "self"
    },
    {
     "from": "serialize",
     "to": "serialize_node",
     "kind": "self"
    },
    {
     "from": "anchor_node",
     "to": "generate_anchor",
     "kind": "self"
    }
   ],
   "spokes": [
    {
     "gate": "__init__",
     "value": "anchors",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "closed",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "last_anchor_id",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "serialized_nodes",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "use_encoding",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "use_explicit_end",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "use_explicit_start",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "use_tags",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "use_version",
     "op": "write"
    },
    {
     "gate": "open",
     "value": "closed",
     "op": "write"
    },
    {
     "gate": "open",
     "value": "use_encoding",
     "op": "read"
    },
    {
     "gate": "close",
     "value": "closed",
     "op": "write"
    },
    {
     "gate": "serialize",
     "value": "anchors",
     "op": "write"
    },
    {
     "gate": "serialize",
     "value": "closed",
     "op": "read"
    },
    {
     "gate": "serialize",
     "value": "last_anchor_id",
     "op": "write"
    },
    {
     "gate": "serialize",
     "value": "serialized_nodes",
     "op": "write"
    },
    {
     "gate": "serialize",
     "value": "use_explicit_end",
     "op": "read"
    },
    {
     "gate": "serialize",
     "value": "use_explicit_start",
     "op": "read"
    },
    {
     "gate": "serialize",
     "value": "use_tags",
     "op": "read"
    },
    {
     "gate": "serialize",
     "value": "use_version",
     "op": "read"
    },
    {
     "gate": "anchor_node",
     "value": "anchors",
     "op": "read"
    },
    {
     "gate": "generate_anchor",
     "value": "ANCHOR_TEMPLATE",
     "op": "read"
    },
    {
     "gate": "generate_anchor",
     "value": "last_anchor_id",
     "op": "write"
    },
    {
     "gate": "serialize_node",
     "value": "anchors",
     "op": "read"
    },
    {
     "gate": "serialize_node",
     "value": "serialized_nodes",
     "op": "read"
    }
   ]
  },
  "Token": {
   "name": "Token",
   "module": "tokens",
   "lines": 10,
   "doc": null,
   "bases": [
    "object"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 3,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    },
    {
     "name": "__repr__",
     "lines": 7,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    }
   ]
  },
  "DirectiveToken": {
   "name": "DirectiveToken",
   "module": "tokens",
   "lines": 5,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 5,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "name",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "value",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "name",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "value",
     "op": "write"
    }
   ]
  },
  "DocumentStartToken": {
   "name": "DocumentStartToken",
   "module": "tokens",
   "lines": 0,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "DocumentEndToken": {
   "name": "DocumentEndToken",
   "module": "tokens",
   "lines": 0,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "StreamStartToken": {
   "name": "StreamStartToken",
   "module": "tokens",
   "lines": 5,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 5,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "encoding",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "encoding",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    }
   ]
  },
  "StreamEndToken": {
   "name": "StreamEndToken",
   "module": "tokens",
   "lines": 0,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "BlockSequenceStartToken": {
   "name": "BlockSequenceStartToken",
   "module": "tokens",
   "lines": 0,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "BlockMappingStartToken": {
   "name": "BlockMappingStartToken",
   "module": "tokens",
   "lines": 0,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "BlockEndToken": {
   "name": "BlockEndToken",
   "module": "tokens",
   "lines": 0,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "FlowSequenceStartToken": {
   "name": "FlowSequenceStartToken",
   "module": "tokens",
   "lines": 0,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "FlowMappingStartToken": {
   "name": "FlowMappingStartToken",
   "module": "tokens",
   "lines": 0,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "FlowSequenceEndToken": {
   "name": "FlowSequenceEndToken",
   "module": "tokens",
   "lines": 0,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "FlowMappingEndToken": {
   "name": "FlowMappingEndToken",
   "module": "tokens",
   "lines": 0,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "KeyToken": {
   "name": "KeyToken",
   "module": "tokens",
   "lines": 0,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "ValueToken": {
   "name": "ValueToken",
   "module": "tokens",
   "lines": 0,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "BlockEntryToken": {
   "name": "BlockEntryToken",
   "module": "tokens",
   "lines": 0,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "FlowEntryToken": {
   "name": "FlowEntryToken",
   "module": "tokens",
   "lines": 0,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [],
   "values": [],
   "wires": [],
   "spokes": []
  },
  "AliasToken": {
   "name": "AliasToken",
   "module": "tokens",
   "lines": 4,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 4,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "value",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "value",
     "op": "write"
    }
   ]
  },
  "AnchorToken": {
   "name": "AnchorToken",
   "module": "tokens",
   "lines": 4,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 4,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "value",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "value",
     "op": "write"
    }
   ]
  },
  "TagToken": {
   "name": "TagToken",
   "module": "tokens",
   "lines": 4,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 4,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "value",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "value",
     "op": "write"
    }
   ]
  },
  "ScalarToken": {
   "name": "ScalarToken",
   "module": "tokens",
   "lines": 6,
   "doc": null,
   "bases": [
    "Token"
   ],
   "gates": [
    {
     "name": "__init__",
     "lines": 6,
     "vis": "private",
     "dunder": true,
     "abstract": false,
     "doc": null
    }
   ],
   "values": [
    {
     "name": "end_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "plain",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "start_mark",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "style",
     "kind": "field",
     "mutated": false
    },
    {
     "name": "value",
     "kind": "field",
     "mutated": false
    }
   ],
   "wires": [],
   "spokes": [
    {
     "gate": "__init__",
     "value": "end_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "plain",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "start_mark",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "style",
     "op": "write"
    },
    {
     "gate": "__init__",
     "value": "value",
     "op": "write"
    }
   ]
  }
 },
 "inherits": [
  {
   "child": "ComposerError",
   "parent": "MarkedYAMLError",
   "typecheck": false
  },
  {
   "child": "ConstructorError",
   "parent": "MarkedYAMLError",
   "typecheck": false
  },
  {
   "child": "SafeConstructor",
   "parent": "BaseConstructor",
   "typecheck": false
  },
  {
   "child": "FullConstructor",
   "parent": "SafeConstructor",
   "typecheck": false
  },
  {
   "child": "UnsafeConstructor",
   "parent": "FullConstructor",
   "typecheck": false
  },
  {
   "child": "Constructor",
   "parent": "UnsafeConstructor",
   "typecheck": false
  },
  {
   "child": "CBaseLoader",
   "parent": "BaseConstructor",
   "typecheck": false
  },
  {
   "child": "CBaseLoader",
   "parent": "BaseResolver",
   "typecheck": false
  },
  {
   "child": "CSafeLoader",
   "parent": "SafeConstructor",
   "typecheck": false
  },
  {
   "child": "CSafeLoader",
   "parent": "Resolver",
   "typecheck": false
  },
  {
   "child": "CFullLoader",
   "parent": "FullConstructor",
   "typecheck": false
  },
  {
   "child": "CFullLoader",
   "parent": "Resolver",
   "typecheck": false
  },
  {
   "child": "CUnsafeLoader",
   "parent": "UnsafeConstructor",
   "typecheck": false
  },
  {
   "child": "CUnsafeLoader",
   "parent": "Resolver",
   "typecheck": false
  },
  {
   "child": "CLoader",
   "parent": "Constructor",
   "typecheck": false
  },
  {
   "child": "CLoader",
   "parent": "Resolver",
   "typecheck": false
  },
  {
   "child": "CBaseDumper",
   "parent": "BaseRepresenter",
   "typecheck": false
  },
  {
   "child": "CBaseDumper",
   "parent": "BaseResolver",
   "typecheck": false
  },
  {
   "child": "CSafeDumper",
   "parent": "SafeRepresenter",
   "typecheck": false
  },
  {
   "child": "CSafeDumper",
   "parent": "Resolver",
   "typecheck": false
  },
  {
   "child": "CDumper",
   "parent": "Serializer",
   "typecheck": false
  },
  {
   "child": "CDumper",
   "parent": "Representer",
   "typecheck": false
  },
  {
   "child": "CDumper",
   "parent": "Resolver",
   "typecheck": false
  },
  {
   "child": "BaseDumper",
   "parent": "Emitter",
   "typecheck": false
  },
  {
   "child": "BaseDumper",
   "parent": "Serializer",
   "typecheck": false
  },
  {
   "child": "BaseDumper",
   "parent": "BaseRepresenter",
   "typecheck": false
  },
  {
   "child": "BaseDumper",
   "parent": "BaseResolver",
   "typecheck": false
  },
  {
   "child": "SafeDumper",
   "parent": "Emitter",
   "typecheck": false
  },
  {
   "child": "SafeDumper",
   "parent": "Serializer",
   "typecheck": false
  },
  {
   "child": "SafeDumper",
   "parent": "SafeRepresenter",
   "typecheck": false
  },
  {
   "child": "SafeDumper",
   "parent": "Resolver",
   "typecheck": false
  },
  {
   "child": "Dumper",
   "parent": "Emitter",
   "typecheck": false
  },
  {
   "child": "Dumper",
   "parent": "Serializer",
   "typecheck": false
  },
  {
   "child": "Dumper",
   "parent": "Representer",
   "typecheck": false
  },
  {
   "child": "Dumper",
   "parent": "Resolver",
   "typecheck": false
  },
  {
   "child": "EmitterError",
   "parent": "YAMLError",
   "typecheck": false
  },
  {
   "child": "MarkedYAMLError",
   "parent": "YAMLError",
   "typecheck": false
  },
  {
   "child": "NodeEvent",
   "parent": "Event",
   "typecheck": false
  },
  {
   "child": "CollectionStartEvent",
   "parent": "NodeEvent",
   "typecheck": false
  },
  {
   "child": "CollectionEndEvent",
   "parent": "Event",
   "typecheck": false
  },
  {
   "child": "StreamStartEvent",
   "parent": "Event",
   "typecheck": false
  },
  {
   "child": "StreamEndEvent",
   "parent": "Event",
   "typecheck": false
  },
  {
   "child": "DocumentStartEvent",
   "parent": "Event",
   "typecheck": false
  },
  {
   "child": "DocumentEndEvent",
   "parent": "Event",
   "typecheck": false
  },
  {
   "child": "AliasEvent",
   "parent": "NodeEvent",
   "typecheck": false
  },
  {
   "child": "ScalarEvent",
   "parent": "NodeEvent",
   "typecheck": false
  },
  {
   "child": "SequenceStartEvent",
   "parent": "CollectionStartEvent",
   "typecheck": false
  },
  {
   "child": "SequenceEndEvent",
   "parent": "CollectionEndEvent",
   "typecheck": false
  },
  {
   "child": "MappingStartEvent",
   "parent": "CollectionStartEvent",
   "typecheck": false
  },
  {
   "child": "MappingEndEvent",
   "parent": "CollectionEndEvent",
   "typecheck": false
  },
  {
   "child": "BaseLoader",
   "parent": "Reader",
   "typecheck": false
  },
  {
   "child": "BaseLoader",
   "parent": "Scanner",
   "typecheck": false
  },
  {
   "child": "BaseLoader",
   "parent": "Parser",
   "typecheck": false
  },
  {
   "child": "BaseLoader",
   "parent": "Composer",
   "typecheck": false
  },
  {
   "child": "BaseLoader",
   "parent": "BaseConstructor",
   "typecheck": false
  },
  {
   "child": "BaseLoader",
   "parent": "BaseResolver",
   "typecheck": false
  },
  {
   "child": "FullLoader",
   "parent": "Reader",
   "typecheck": false
  },
  {
   "child": "FullLoader",
   "parent": "Scanner",
   "typecheck": false
  },
  {
   "child": "FullLoader",
   "parent": "Parser",
   "typecheck": false
  },
  {
   "child": "FullLoader",
   "parent": "Composer",
   "typecheck": false
  },
  {
   "child": "FullLoader",
   "parent": "FullConstructor",
   "typecheck": false
  },
  {
   "child": "FullLoader",
   "parent": "Resolver",
   "typecheck": false
  },
  {
   "child": "SafeLoader",
   "parent": "Reader",
   "typecheck": false
  },
  {
   "child": "SafeLoader",
   "parent": "Scanner",
   "typecheck": false
  },
  {
   "child": "SafeLoader",
   "parent": "Parser",
   "typecheck": false
  },
  {
   "child": "SafeLoader",
   "parent": "Composer",
   "typecheck": false
  },
  {
   "child": "SafeLoader",
   "parent": "SafeConstructor",
   "typecheck": false
  },
  {
   "child": "SafeLoader",
   "parent": "Resolver",
   "typecheck": false
  },
  {
   "child": "Loader",
   "parent": "Reader",
   "typecheck": false
  },
  {
   "child": "Loader",
   "parent": "Scanner",
   "typecheck": false
  },
  {
   "child": "Loader",
   "parent": "Parser",
   "typecheck": false
  },
  {
   "child": "Loader",
   "parent": "Composer",
   "typecheck": false
  },
  {
   "child": "Loader",
   "parent": "Constructor",
   "typecheck": false
  },
  {
   "child": "Loader",
   "parent": "Resolver",
   "typecheck": false
  },
  {
   "child": "UnsafeLoader",
   "parent": "Reader",
   "typecheck": false
  },
  {
   "child": "UnsafeLoader",
   "parent": "Scanner",
   "typecheck": false
  },
  {
   "child": "UnsafeLoader",
   "parent": "Parser",
   "typecheck": false
  },
  {
   "child": "UnsafeLoader",
   "parent": "Composer",
   "typecheck": false
  },
  {
   "child": "UnsafeLoader",
   "parent": "Constructor",
   "typecheck": false
  },
  {
   "child": "UnsafeLoader",
   "parent": "Resolver",
   "typecheck": false
  },
  {
   "child": "ScalarNode",
   "parent": "Node",
   "typecheck": false
  },
  {
   "child": "CollectionNode",
   "parent": "Node",
   "typecheck": false
  },
  {
   "child": "SequenceNode",
   "parent": "CollectionNode",
   "typecheck": false
  },
  {
   "child": "MappingNode",
   "parent": "CollectionNode",
   "typecheck": false
  },
  {
   "child": "ParserError",
   "parent": "MarkedYAMLError",
   "typecheck": false
  },
  {
   "child": "ReaderError",
   "parent": "YAMLError",
   "typecheck": false
  },
  {
   "child": "RepresenterError",
   "parent": "YAMLError",
   "typecheck": false
  },
  {
   "child": "SafeRepresenter",
   "parent": "BaseRepresenter",
   "typecheck": false
  },
  {
   "child": "Representer",
   "parent": "SafeRepresenter",
   "typecheck": false
  },
  {
   "child": "ResolverError",
   "parent": "YAMLError",
   "typecheck": false
  },
  {
   "child": "Resolver",
   "parent": "BaseResolver",
   "typecheck": false
  },
  {
   "child": "ScannerError",
   "parent": "MarkedYAMLError",
   "typecheck": false
  },
  {
   "child": "SerializerError",
   "parent": "YAMLError",
   "typecheck": false
  },
  {
   "child": "DirectiveToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "DocumentStartToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "DocumentEndToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "StreamStartToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "StreamEndToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "BlockSequenceStartToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "BlockMappingStartToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "BlockEndToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "FlowSequenceStartToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "FlowMappingStartToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "FlowSequenceEndToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "FlowMappingEndToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "KeyToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "ValueToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "BlockEntryToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "FlowEntryToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "AliasToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "AnchorToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "TagToken",
   "parent": "Token",
   "typecheck": false
  },
  {
   "child": "ScalarToken",
   "parent": "Token",
   "typecheck": false
  }
 ],
 "links": [
  {
   "kind": "ctor",
   "from": {
    "cls": "Composer",
    "at": "gate",
    "name": "get_single_node"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Composer",
    "at": "gate",
    "name": "compose_node"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "BaseConstructor",
    "at": "gate",
    "name": "check_state_key"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "BaseConstructor",
    "at": "gate",
    "name": "construct_object"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "BaseConstructor",
    "at": "gate",
    "name": "construct_scalar"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "BaseConstructor",
    "at": "gate",
    "name": "construct_sequence"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "BaseConstructor",
    "at": "gate",
    "name": "construct_mapping"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "BaseConstructor",
    "at": "gate",
    "name": "construct_pairs"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "super",
   "from": {
    "cls": "SafeConstructor",
    "at": "gate",
    "name": "construct_scalar"
   },
   "to": {
    "cls": "BaseConstructor",
    "at": "gate",
    "name": "construct_scalar"
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "SafeConstructor",
    "at": "gate",
    "name": "flatten_mapping"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "super",
   "from": {
    "cls": "SafeConstructor",
    "at": "gate",
    "name": "construct_mapping"
   },
   "to": {
    "cls": "BaseConstructor",
    "at": "gate",
    "name": "construct_mapping"
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "SafeConstructor",
    "at": "gate",
    "name": "construct_yaml_binary"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "SafeConstructor",
    "at": "gate",
    "name": "construct_yaml_omap"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "SafeConstructor",
    "at": "gate",
    "name": "construct_yaml_pairs"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "SafeConstructor",
    "at": "gate",
    "name": "construct_undefined"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "FullConstructor",
    "at": "gate",
    "name": "construct_python_bytes"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "FullConstructor",
    "at": "gate",
    "name": "find_python_module"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "FullConstructor",
    "at": "gate",
    "name": "find_python_name"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "FullConstructor",
    "at": "gate",
    "name": "construct_python_name"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "FullConstructor",
    "at": "gate",
    "name": "construct_python_module"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "FullConstructor",
    "at": "gate",
    "name": "make_python_instance"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "super",
   "from": {
    "cls": "UnsafeConstructor",
    "at": "gate",
    "name": "find_python_module"
   },
   "to": {
    "cls": "FullConstructor",
    "at": "gate",
    "name": "find_python_module"
   }
  },
  {
   "kind": "super",
   "from": {
    "cls": "UnsafeConstructor",
    "at": "gate",
    "name": "find_python_name"
   },
   "to": {
    "cls": "FullConstructor",
    "at": "gate",
    "name": "find_python_name"
   }
  },
  {
   "kind": "super",
   "from": {
    "cls": "UnsafeConstructor",
    "at": "gate",
    "name": "make_python_instance"
   },
   "to": {
    "cls": "FullConstructor",
    "at": "gate",
    "name": "make_python_instance"
   }
  },
  {
   "kind": "super",
   "from": {
    "cls": "UnsafeConstructor",
    "at": "gate",
    "name": "set_python_instance_state"
   },
   "to": {
    "cls": "FullConstructor",
    "at": "gate",
    "name": "set_python_instance_state"
   }
  },
  {
   "kind": "read",
   "from": {
    "cls": "Emitter",
    "at": "gate",
    "name": "check_simple_key"
   },
   "to": {
    "cls": "ScalarAnalysis",
    "at": "value",
    "name": "scalar"
   }
  },
  {
   "kind": "read",
   "from": {
    "cls": "Emitter",
    "at": "gate",
    "name": "check_simple_key"
   },
   "to": {
    "cls": "ScalarAnalysis",
    "at": "value",
    "name": "empty"
   }
  },
  {
   "kind": "read",
   "from": {
    "cls": "Emitter",
    "at": "gate",
    "name": "check_simple_key"
   },
   "to": {
    "cls": "ScalarAnalysis",
    "at": "value",
    "name": "multiline"
   }
  },
  {
   "kind": "read",
   "from": {
    "cls": "Emitter",
    "at": "gate",
    "name": "choose_scalar_style"
   },
   "to": {
    "cls": "ScalarAnalysis",
    "at": "value",
    "name": "allow_block"
   }
  },
  {
   "kind": "read",
   "from": {
    "cls": "Emitter",
    "at": "gate",
    "name": "choose_scalar_style"
   },
   "to": {
    "cls": "ScalarAnalysis",
    "at": "value",
    "name": "allow_single_quoted"
   }
  },
  {
   "kind": "read",
   "from": {
    "cls": "Emitter",
    "at": "gate",
    "name": "choose_scalar_style"
   },
   "to": {
    "cls": "ScalarAnalysis",
    "at": "value",
    "name": "allow_flow_plain"
   }
  },
  {
   "kind": "read",
   "from": {
    "cls": "Emitter",
    "at": "gate",
    "name": "choose_scalar_style"
   },
   "to": {
    "cls": "ScalarAnalysis",
    "at": "value",
    "name": "allow_block_plain"
   }
  },
  {
   "kind": "read",
   "from": {
    "cls": "Emitter",
    "at": "gate",
    "name": "choose_scalar_style"
   },
   "to": {
    "cls": "ScalarAnalysis",
    "at": "value",
    "name": "multiline"
   }
  },
  {
   "kind": "read",
   "from": {
    "cls": "Emitter",
    "at": "gate",
    "name": "choose_scalar_style"
   },
   "to": {
    "cls": "ScalarAnalysis",
    "at": "value",
    "name": "empty"
   }
  },
  {
   "kind": "read",
   "from": {
    "cls": "Emitter",
    "at": "gate",
    "name": "process_scalar"
   },
   "to": {
    "cls": "ScalarAnalysis",
    "at": "value",
    "name": "scalar"
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Emitter",
    "at": "gate",
    "name": "analyze_scalar"
   },
   "to": {
    "cls": "ScalarAnalysis",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Parser",
    "at": "gate",
    "name": "parse_document_start"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Parser",
    "at": "gate",
    "name": "process_directives"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Parser",
    "at": "gate",
    "name": "parse_node"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Parser",
    "at": "gate",
    "name": "parse_block_sequence_entry"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Parser",
    "at": "gate",
    "name": "parse_block_mapping_key"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Parser",
    "at": "gate",
    "name": "parse_flow_sequence_entry"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Parser",
    "at": "gate",
    "name": "parse_flow_mapping_key"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Reader",
    "at": "gate",
    "name": "get_mark"
   },
   "to": {
    "cls": "Mark",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Reader",
    "at": "gate",
    "name": "check_printable"
   },
   "to": {
    "cls": "ReaderError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Reader",
    "at": "gate",
    "name": "update"
   },
   "to": {
    "cls": "ReaderError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "fetch_more_tokens"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "stale_possible_simple_keys"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "save_possible_simple_key"
   },
   "to": {
    "cls": "SimpleKey",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "remove_possible_simple_key"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "fetch_block_entry"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "fetch_key"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "fetch_value"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_directive_name"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_yaml_directive_value"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_yaml_directive_number"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_tag_directive_handle"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_tag_directive_prefix"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_directive_ignored_line"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_anchor"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_tag"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_block_scalar_indicators"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_block_scalar_ignored_line"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_flow_scalar_non_spaces"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_flow_scalar_spaces"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_flow_scalar_breaks"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_tag_handle"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_tag_uri"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "ctor",
   "from": {
    "cls": "Scanner",
    "at": "gate",
    "name": "scan_uri_escapes"
   },
   "to": {
    "cls": "MarkedYAMLError",
    "at": "core",
    "name": null
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "SafeConstructor",
    "at": "gate",
    "name": "construct_scalar"
   },
   "to": {
    "cls": "BaseConstructor",
    "at": "gate",
    "name": "construct_scalar"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "SafeConstructor",
    "at": "gate",
    "name": "construct_mapping"
   },
   "to": {
    "cls": "BaseConstructor",
    "at": "gate",
    "name": "construct_mapping"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "UnsafeConstructor",
    "at": "gate",
    "name": "make_python_instance"
   },
   "to": {
    "cls": "FullConstructor",
    "at": "gate",
    "name": "make_python_instance"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "UnsafeConstructor",
    "at": "gate",
    "name": "find_python_name"
   },
   "to": {
    "cls": "FullConstructor",
    "at": "gate",
    "name": "find_python_name"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "UnsafeConstructor",
    "at": "gate",
    "name": "find_python_module"
   },
   "to": {
    "cls": "FullConstructor",
    "at": "gate",
    "name": "find_python_module"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "UnsafeConstructor",
    "at": "gate",
    "name": "set_python_instance_state"
   },
   "to": {
    "cls": "FullConstructor",
    "at": "gate",
    "name": "set_python_instance_state"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "CBaseLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "BaseConstructor",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "CBaseLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "BaseResolver",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "CBaseDumper",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "BaseRepresenter",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "CBaseDumper",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "BaseResolver",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "CDumper",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Serializer",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "BaseDumper",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Emitter",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "BaseDumper",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Serializer",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "BaseDumper",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "BaseRepresenter",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "BaseDumper",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "BaseResolver",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "SafeDumper",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Emitter",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "SafeDumper",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Serializer",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "Dumper",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Emitter",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "Dumper",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Serializer",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "NodeEvent",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Event",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "CollectionStartEvent",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "NodeEvent",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "StreamStartEvent",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Event",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "DocumentStartEvent",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Event",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "DocumentEndEvent",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Event",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "ScalarEvent",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "NodeEvent",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "BaseLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Reader",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "BaseLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Scanner",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "BaseLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Parser",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "BaseLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Composer",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "BaseLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "BaseConstructor",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "BaseLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "BaseResolver",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "FullLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Reader",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "FullLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Scanner",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "FullLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Parser",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "FullLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Composer",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "SafeLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Reader",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "SafeLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Scanner",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "SafeLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Parser",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "SafeLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Composer",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "Loader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Reader",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "Loader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Scanner",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "Loader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Parser",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "Loader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Composer",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "UnsafeLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Reader",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "UnsafeLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Scanner",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "UnsafeLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Parser",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "UnsafeLoader",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Composer",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "ScalarNode",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Node",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "CollectionNode",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Node",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "SafeRepresenter",
    "at": "gate",
    "name": "ignore_aliases"
   },
   "to": {
    "cls": "BaseRepresenter",
    "at": "gate",
    "name": "ignore_aliases"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "DirectiveToken",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Token",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "StreamStartToken",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Token",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "AliasToken",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Token",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "AnchorToken",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Token",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "TagToken",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Token",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "override",
   "from": {
    "cls": "ScalarToken",
    "at": "gate",
    "name": "__init__"
   },
   "to": {
    "cls": "Token",
    "at": "gate",
    "name": "__init__"
   }
  },
  {
   "kind": "hold",
   "from": {
    "cls": "Emitter",
    "at": "value",
    "name": "analysis"
   },
   "to": {
    "cls": "ScalarAnalysis",
    "at": "core",
    "name": null
   }
  }
 ],
 "package": {
  "name": "yaml",
  "doc": null,
  "modules": {
   "__init__": null,
   "composer": null,
   "constructor": null,
   "cyaml": null,
   "dumper": null,
   "emitter": null,
   "error": null,
   "events": null,
   "loader": null,
   "nodes": null,
   "parser": null,
   "reader": null,
   "representer": null,
   "resolver": null,
   "scanner": null,
   "serializer": null,
   "tokens": null
  }
 }
};
