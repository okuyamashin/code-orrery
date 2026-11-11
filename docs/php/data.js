window.CODE = {
 "package": {
  "name": "php-src",
  "doc": null,
  "modules": {
   "Zend": null,
   "ext/session": null,
   "main": null,
   "sapi/cli": null
  }
 },
 "classes": {
  "zend_alloc.c": {
   "name": "zend_alloc.c",
   "module": "Zend",
   "lines": 169,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "_emalloc",
     "lines": 9,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 0,
     "doc": null
    },
    {
     "name": "zend_handle_delayed_oom",
     "lines": 53,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 0,
     "doc": null
    },
    {
     "name": "zend_mm_oom_info_dtor",
     "lines": 11,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_mm_alloc_heap",
     "lines": 53,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "_safe_emalloc",
     "lines": 6,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": -1,
     "doc": null
    },
    {
     "name": "_ecalloc",
     "lines": 10,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": -1,
     "doc": null
    },
    {
     "name": "_estrdup",
     "lines": 14,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": -1,
     "doc": null
    },
    {
     "name": "_estrndup",
     "lines": 13,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": -1,
     "doc": null
    }
   ],
   "values": [],
   "wires": [
    {
     "from": "_emalloc",
     "to": "zend_mm_alloc_heap",
     "kind": "call"
    },
    {
     "from": "zend_handle_delayed_oom",
     "to": "zend_mm_oom_info_dtor",
     "kind": "call"
    },
    {
     "from": "_safe_emalloc",
     "to": "_emalloc",
     "kind": "call"
    },
    {
     "from": "_ecalloc",
     "to": "_emalloc",
     "kind": "call"
    },
    {
     "from": "_estrdup",
     "to": "_emalloc",
     "kind": "call"
    },
    {
     "from": "_estrndup",
     "to": "_emalloc",
     "kind": "call"
    }
   ],
   "spokes": [],
   "tier": "core",
   "min_dist": 0
  },
  "session.c": {
   "name": "session.c",
   "module": "ext/session",
   "lines": 686,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "php_session_initialize",
     "lines": 99,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 0,
     "doc": null
    },
    {
     "name": "ps_encode_php_serialize",
     "lines": 12,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 0,
     "doc": null
    },
    {
     "name": "ps_decode_php_serialize",
     "lines": 30,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 0,
     "doc": null
    },
    {
     "name": "ps_decode_php",
     "lines": 47,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 0,
     "doc": null
    },
    {
     "name": "php_session_rfc1867_update",
     "lines": 38,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 0,
     "doc": null
    },
    {
     "name": "php_session_rfc1867_cleanup",
     "lines": 15,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 0,
     "doc": null
    },
    {
     "name": "php_session_rfc1867_callback",
     "lines": 197,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 0,
     "doc": null
    },
    {
     "name": "php_rinit_session_globals",
     "lines": 15,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_session_cleanup_filename",
     "lines": 8,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_rshutdown_session_globals",
     "lines": 33,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_set_session_var",
     "lines": 9,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_session_track_init",
     "lines": 17,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_session_decode",
     "lines": 15,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_session_gc",
     "lines": 29,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_session_normalize_vars",
     "lines": 14,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_session_unserialize_init",
     "lines": 7,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_session_serialize_init",
     "lines": 7,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_session_flush",
     "lines": 9,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_session_abort",
     "lines": 11,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_session_reset",
     "lines": 8,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": -1,
     "doc": null
    },
    {
     "name": "php_rinit_session",
     "lines": 35,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_session_rfc1867_early_find_sid",
     "lines": 16,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_check_cancel_upload",
     "lines": 15,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    }
   ],
   "values": [],
   "wires": [
    {
     "from": "php_session_initialize",
     "to": "php_session_abort",
     "kind": "call"
    },
    {
     "from": "php_session_initialize",
     "to": "php_session_cleanup_filename",
     "kind": "call"
    },
    {
     "from": "php_session_initialize",
     "to": "php_session_decode",
     "kind": "call"
    },
    {
     "from": "php_session_initialize",
     "to": "php_session_gc",
     "kind": "call"
    },
    {
     "from": "php_session_initialize",
     "to": "php_session_track_init",
     "kind": "call"
    },
    {
     "from": "ps_encode_php_serialize",
     "to": "php_session_serialize_init",
     "kind": "call"
    },
    {
     "from": "ps_decode_php_serialize",
     "to": "php_session_unserialize_init",
     "kind": "call"
    },
    {
     "from": "ps_decode_php",
     "to": "php_session_normalize_vars",
     "kind": "call"
    },
    {
     "from": "ps_decode_php",
     "to": "php_session_unserialize_init",
     "kind": "call"
    },
    {
     "from": "ps_decode_php",
     "to": "php_set_session_var",
     "kind": "call"
    },
    {
     "from": "php_session_rfc1867_update",
     "to": "php_check_cancel_upload",
     "kind": "call"
    },
    {
     "from": "php_session_rfc1867_update",
     "to": "php_session_flush",
     "kind": "call"
    },
    {
     "from": "php_session_rfc1867_update",
     "to": "php_session_initialize",
     "kind": "call"
    },
    {
     "from": "php_session_rfc1867_cleanup",
     "to": "php_session_flush",
     "kind": "call"
    },
    {
     "from": "php_session_rfc1867_cleanup",
     "to": "php_session_initialize",
     "kind": "call"
    },
    {
     "from": "php_session_rfc1867_callback",
     "to": "php_rinit_session",
     "kind": "call"
    },
    {
     "from": "php_session_rfc1867_callback",
     "to": "php_rinit_session_globals",
     "kind": "call"
    },
    {
     "from": "php_session_rfc1867_callback",
     "to": "php_rshutdown_session_globals",
     "kind": "call"
    },
    {
     "from": "php_session_rfc1867_callback",
     "to": "php_session_rfc1867_cleanup",
     "kind": "call"
    },
    {
     "from": "php_session_rfc1867_callback",
     "to": "php_session_rfc1867_early_find_sid",
     "kind": "call"
    },
    {
     "from": "php_session_rfc1867_callback",
     "to": "php_session_rfc1867_update",
     "kind": "call"
    },
    {
     "from": "php_rshutdown_session_globals",
     "to": "php_session_cleanup_filename",
     "kind": "call"
    },
    {
     "from": "php_session_reset",
     "to": "php_session_initialize",
     "kind": "call"
    },
    {
     "from": "php_rinit_session",
     "to": "php_rinit_session_globals",
     "kind": "call"
    }
   ],
   "spokes": [],
   "tier": "core",
   "min_dist": 0
  },
  "rfc1867.c": {
   "name": "rfc1867.c",
   "module": "main",
   "lines": 991,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "rfc1867_post_handler",
     "lines": 780,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 0,
     "doc": null
    },
    {
     "name": "add_protected_variable",
     "lines": 6,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "safe_php_register_variable",
     "lines": 7,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "register_http_post_files_variable",
     "lines": 4,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "register_http_post_files_variable_ex",
     "lines": 4,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "multipart_buffer_eof",
     "lines": 4,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "multipart_buffer_new",
     "lines": 28,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "multipart_buffer_headers",
     "lines": 77,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_mime_get_hdr_value",
     "lines": 18,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "multipart_buffer_read",
     "lines": 41,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "multipart_buffer_read_body",
     "lines": 22,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    }
   ],
   "values": [],
   "wires": [
    {
     "from": "rfc1867_post_handler",
     "to": "add_protected_variable",
     "kind": "call"
    },
    {
     "from": "rfc1867_post_handler",
     "to": "multipart_buffer_eof",
     "kind": "call"
    },
    {
     "from": "rfc1867_post_handler",
     "to": "multipart_buffer_headers",
     "kind": "call"
    },
    {
     "from": "rfc1867_post_handler",
     "to": "multipart_buffer_new",
     "kind": "call"
    },
    {
     "from": "rfc1867_post_handler",
     "to": "multipart_buffer_read",
     "kind": "call"
    },
    {
     "from": "rfc1867_post_handler",
     "to": "multipart_buffer_read_body",
     "kind": "call"
    },
    {
     "from": "rfc1867_post_handler",
     "to": "php_mime_get_hdr_value",
     "kind": "call"
    },
    {
     "from": "rfc1867_post_handler",
     "to": "register_http_post_files_variable",
     "kind": "call"
    },
    {
     "from": "rfc1867_post_handler",
     "to": "register_http_post_files_variable_ex",
     "kind": "call"
    },
    {
     "from": "rfc1867_post_handler",
     "to": "safe_php_register_variable",
     "kind": "call"
    },
    {
     "from": "register_http_post_files_variable",
     "to": "safe_php_register_variable",
     "kind": "call"
    },
    {
     "from": "multipart_buffer_headers",
     "to": "php_mime_get_hdr_value",
     "kind": "call"
    },
    {
     "from": "multipart_buffer_read_body",
     "to": "multipart_buffer_read",
     "kind": "call"
    }
   ],
   "spokes": [],
   "tier": "core",
   "min_dist": 0
  },
  "main.c": {
   "name": "main.c",
   "module": "main",
   "lines": 109,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "php_request_startup",
     "lines": 75,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 0,
     "doc": null
    },
    {
     "name": "php_request_shutdown",
     "lines": 30,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 0,
     "doc": null
    },
    {
     "name": "php_error_docref",
     "lines": 4,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    }
   ],
   "values": [],
   "wires": [],
   "spokes": [],
   "tier": "core",
   "min_dist": 0
  },
  "SAPI.c": {
   "name": "SAPI.c",
   "module": "main",
   "lines": 81,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "sapi_handle_post",
     "lines": 12,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 0,
     "doc": null
    },
    {
     "name": "sapi_activate",
     "lines": 54,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "sapi_get_request_time",
     "lines": 15,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    }
   ],
   "values": [],
   "wires": [],
   "spokes": [],
   "tier": "core",
   "min_dist": 0
  },
  "zend.c": {
   "name": "zend.c",
   "module": "Zend",
   "lines": 277,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "_zend_bailout",
     "lines": 15,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 0,
     "doc": null
    },
    {
     "name": "zend_activate",
     "lines": 15,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_error_zstr_at",
     "lines": 162,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_throw_error",
     "lines": 30,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_output_debug_string",
     "lines": 24,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_execute_script",
     "lines": 31,
     "vis": "public",
     "tier": "core",
     "dunder": false,
     "abstract": false,
     "dist": -1,
     "doc": null
    }
   ],
   "values": [],
   "wires": [
    {
     "from": "_zend_bailout",
     "to": "zend_output_debug_string",
     "kind": "call"
    }
   ],
   "spokes": [],
   "tier": "core",
   "min_dist": 0
  },
  "output.c": {
   "name": "output.c",
   "module": "main",
   "lines": 36,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "php_output_activate",
     "lines": 13,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_output_start_user",
     "lines": 15,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "php_output_set_implicit_flush",
     "lines": 8,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    }
   ],
   "values": [],
   "wires": [],
   "spokes": [],
   "tier": "periphery",
   "min_dist": 1
  },
  "zend_smart_str.h": {
   "name": "zend_smart_str.h",
   "module": "Zend",
   "lines": 17,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "smart_str_free",
     "lines": 4,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "smart_str_0",
     "lines": 5,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "smart_str_appendl",
     "lines": 4,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "smart_str_appends",
     "lines": 4,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    }
   ],
   "values": [],
   "wires": [],
   "spokes": [],
   "tier": "periphery",
   "min_dist": 1
  },
  "zend_llist.c": {
   "name": "zend_llist.c",
   "module": "Zend",
   "lines": 31,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "zend_llist_init",
     "lines": 9,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_llist_destroy",
     "lines": 17,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_llist_clean",
     "lines": 5,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    }
   ],
   "values": [],
   "wires": [
    {
     "from": "zend_llist_clean",
     "to": "zend_llist_destroy",
     "kind": "call"
    }
   ],
   "spokes": [],
   "tier": "periphery",
   "min_dist": 1
  },
  "php_cli_server.c": {
   "name": "php_cli_server.c",
   "module": "sapi/cli",
   "lines": 85,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "php_cli_server_request_startup",
     "lines": 14,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": -1,
     "doc": null
    },
    {
     "name": "php_cli_server_request_shutdown",
     "lines": 9,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": -1,
     "doc": null
    },
    {
     "name": "php_cli_server_dispatch",
     "lines": 62,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": -1,
     "doc": null
    }
   ],
   "values": [],
   "wires": [
    {
     "from": "php_cli_server_dispatch",
     "to": "php_cli_server_request_shutdown",
     "kind": "call"
    },
    {
     "from": "php_cli_server_dispatch",
     "to": "php_cli_server_request_startup",
     "kind": "call"
    }
   ],
   "spokes": [],
   "tier": "periphery",
   "min_dist": 1
  },
  "zend_string.h": {
   "name": "zend_string.h",
   "module": "Zend",
   "lines": 37,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "zend_string_init",
     "lines": 8,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_string_copy",
     "lines": 7,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_string_release",
     "lines": 8,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_string_release_ex",
     "lines": 14,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    }
   ],
   "values": [],
   "wires": [],
   "spokes": [],
   "tier": "periphery",
   "min_dist": 1
  },
  "zend_execute_API.c": {
   "name": "zend_execute_API.c",
   "module": "Zend",
   "lines": 344,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "zend_get_executed_filename_ex",
     "lines": 18,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_get_executed_lineno",
     "lines": 26,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_call_function",
     "lines": 289,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": -1,
     "doc": null
    },
    {
     "name": "zend_set_timeout",
     "lines": 7,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_delete_global_variable",
     "lines": 4,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    }
   ],
   "values": [],
   "wires": [],
   "spokes": [],
   "tier": "periphery",
   "min_dist": 1
  },
  "zend_API.c": {
   "name": "zend_API.c",
   "module": "Zend",
   "lines": 46,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "add_assoc_long_ex",
     "lines": 7,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "add_assoc_null_ex",
     "lines": 7,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "add_assoc_bool_ex",
     "lines": 7,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "add_assoc_string_ex",
     "lines": 7,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "add_assoc_zval_ex",
     "lines": 4,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_activate_modules",
     "lines": 14,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    }
   ],
   "values": [],
   "wires": [],
   "spokes": [],
   "tier": "periphery",
   "min_dist": 1
  },
  "zend_hash.c": {
   "name": "zend_hash.c",
   "module": "Zend",
   "lines": 130,
   "doc": null,
   "bases": [],
   "gates": [
    {
     "name": "zend_hash_update",
     "lines": 4,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_hash_update_ind",
     "lines": 4,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_hash_del",
     "lines": 31,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_hash_destroy",
     "lines": 80,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    },
    {
     "name": "zend_hash_str_find",
     "lines": 11,
     "vis": "private",
     "tier": "periphery",
     "dunder": false,
     "abstract": false,
     "dist": 1,
     "doc": null
    }
   ],
   "values": [],
   "wires": [],
   "spokes": [],
   "tier": "periphery",
   "min_dist": 1
  }
 },
 "inherits": [],
 "links": [
  {
   "kind": "call",
   "from": {
    "cls": "zend_alloc.c",
    "at": "gate",
    "name": "zend_handle_delayed_oom"
   },
   "to": {
    "cls": "zend.c",
    "at": "gate",
    "name": "zend_error_zstr_at"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "zend_alloc.c",
    "at": "gate",
    "name": "zend_handle_delayed_oom"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_init"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "zend_alloc.c",
    "at": "gate",
    "name": "zend_handle_delayed_oom"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "zend_alloc.c",
    "at": "gate",
    "name": "zend_mm_oom_info_dtor"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_initialize"
   },
   "to": {
    "cls": "zend.c",
    "at": "gate",
    "name": "zend_throw_error"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_initialize"
   },
   "to": {
    "cls": "zend_execute_API.c",
    "at": "gate",
    "name": "zend_get_executed_filename_ex"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_initialize"
   },
   "to": {
    "cls": "zend_execute_API.c",
    "at": "gate",
    "name": "zend_get_executed_lineno"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_initialize"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_copy"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_initialize"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release_ex"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_initialize"
   },
   "to": {
    "cls": "main.c",
    "at": "gate",
    "name": "php_error_docref"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "ps_decode_php_serialize"
   },
   "to": {
    "cls": "zend_hash.c",
    "at": "gate",
    "name": "zend_hash_update_ind"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "ps_decode_php_serialize"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release_ex"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "ps_decode_php"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_init"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "ps_decode_php"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release_ex"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_update"
   },
   "to": {
    "cls": "zend_hash.c",
    "at": "gate",
    "name": "zend_hash_update"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_cleanup"
   },
   "to": {
    "cls": "zend_hash.c",
    "at": "gate",
    "name": "zend_hash_del"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_callback"
   },
   "to": {
    "cls": "zend_API.c",
    "at": "gate",
    "name": "add_assoc_bool_ex"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_callback"
   },
   "to": {
    "cls": "zend_API.c",
    "at": "gate",
    "name": "add_assoc_long_ex"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_callback"
   },
   "to": {
    "cls": "zend_API.c",
    "at": "gate",
    "name": "add_assoc_null_ex"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_callback"
   },
   "to": {
    "cls": "zend_API.c",
    "at": "gate",
    "name": "add_assoc_string_ex"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_callback"
   },
   "to": {
    "cls": "zend_API.c",
    "at": "gate",
    "name": "add_assoc_zval_ex"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_callback"
   },
   "to": {
    "cls": "zend_execute_API.c",
    "at": "gate",
    "name": "zend_delete_global_variable"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_callback"
   },
   "to": {
    "cls": "zend_hash.c",
    "at": "gate",
    "name": "zend_hash_str_find"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_callback"
   },
   "to": {
    "cls": "zend_smart_str.h",
    "at": "gate",
    "name": "smart_str_0"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_callback"
   },
   "to": {
    "cls": "zend_smart_str.h",
    "at": "gate",
    "name": "smart_str_appendl"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_callback"
   },
   "to": {
    "cls": "zend_smart_str.h",
    "at": "gate",
    "name": "smart_str_appends"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_callback"
   },
   "to": {
    "cls": "zend_smart_str.h",
    "at": "gate",
    "name": "smart_str_free"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_callback"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_init"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_callback"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release_ex"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_rfc1867_callback"
   },
   "to": {
    "cls": "SAPI.c",
    "at": "gate",
    "name": "sapi_get_request_time"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_cleanup_filename"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_rshutdown_session_globals"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_rshutdown_session_globals"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release_ex"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_set_session_var"
   },
   "to": {
    "cls": "zend_hash.c",
    "at": "gate",
    "name": "zend_hash_update"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_track_init"
   },
   "to": {
    "cls": "zend_execute_API.c",
    "at": "gate",
    "name": "zend_delete_global_variable"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_track_init"
   },
   "to": {
    "cls": "zend_hash.c",
    "at": "gate",
    "name": "zend_hash_update_ind"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_session_track_init"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release_ex"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "session.c",
    "at": "gate",
    "name": "php_check_cancel_upload"
   },
   "to": {
    "cls": "zend_hash.c",
    "at": "gate",
    "name": "zend_hash_str_find"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "rfc1867.c",
    "at": "gate",
    "name": "rfc1867_post_handler"
   },
   "to": {
    "cls": "zend_hash.c",
    "at": "gate",
    "name": "zend_hash_destroy"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "rfc1867.c",
    "at": "gate",
    "name": "rfc1867_post_handler"
   },
   "to": {
    "cls": "zend_llist.c",
    "at": "gate",
    "name": "zend_llist_clean"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "rfc1867.c",
    "at": "gate",
    "name": "rfc1867_post_handler"
   },
   "to": {
    "cls": "zend_llist.c",
    "at": "gate",
    "name": "zend_llist_destroy"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "rfc1867.c",
    "at": "gate",
    "name": "rfc1867_post_handler"
   },
   "to": {
    "cls": "zend_llist.c",
    "at": "gate",
    "name": "zend_llist_init"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "rfc1867.c",
    "at": "gate",
    "name": "rfc1867_post_handler"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release_ex"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "main.c",
    "at": "gate",
    "name": "php_request_startup"
   },
   "to": {
    "cls": "zend.c",
    "at": "gate",
    "name": "zend_activate"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "main.c",
    "at": "gate",
    "name": "php_request_startup"
   },
   "to": {
    "cls": "zend_API.c",
    "at": "gate",
    "name": "zend_activate_modules"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "main.c",
    "at": "gate",
    "name": "php_request_startup"
   },
   "to": {
    "cls": "zend_execute_API.c",
    "at": "gate",
    "name": "zend_set_timeout"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "main.c",
    "at": "gate",
    "name": "php_request_startup"
   },
   "to": {
    "cls": "SAPI.c",
    "at": "gate",
    "name": "sapi_activate"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "main.c",
    "at": "gate",
    "name": "php_request_startup"
   },
   "to": {
    "cls": "output.c",
    "at": "gate",
    "name": "php_output_activate"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "main.c",
    "at": "gate",
    "name": "php_request_startup"
   },
   "to": {
    "cls": "output.c",
    "at": "gate",
    "name": "php_output_set_implicit_flush"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "main.c",
    "at": "gate",
    "name": "php_request_startup"
   },
   "to": {
    "cls": "output.c",
    "at": "gate",
    "name": "php_output_start_user"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "SAPI.c",
    "at": "gate",
    "name": "sapi_handle_post"
   },
   "to": {
    "cls": "zend_alloc.c",
    "at": "gate",
    "name": "zend_handle_delayed_oom"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "SAPI.c",
    "at": "gate",
    "name": "sapi_activate"
   },
   "to": {
    "cls": "zend_llist.c",
    "at": "gate",
    "name": "zend_llist_init"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "zend.c",
    "at": "gate",
    "name": "zend_error_zstr_at"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_copy"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "zend.c",
    "at": "gate",
    "name": "zend_throw_error"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "zend.c",
    "at": "gate",
    "name": "zend_execute_script"
   },
   "to": {
    "cls": "zend_alloc.c",
    "at": "gate",
    "name": "zend_handle_delayed_oom"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "php_cli_server.c",
    "at": "gate",
    "name": "php_cli_server_request_startup"
   },
   "to": {
    "cls": "zend_hash.c",
    "at": "gate",
    "name": "zend_hash_str_find"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "php_cli_server.c",
    "at": "gate",
    "name": "php_cli_server_request_startup"
   },
   "to": {
    "cls": "main.c",
    "at": "gate",
    "name": "php_request_startup"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "php_cli_server.c",
    "at": "gate",
    "name": "php_cli_server_request_shutdown"
   },
   "to": {
    "cls": "main.c",
    "at": "gate",
    "name": "php_request_shutdown"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "php_cli_server.c",
    "at": "gate",
    "name": "php_cli_server_dispatch"
   },
   "to": {
    "cls": "main.c",
    "at": "gate",
    "name": "php_request_shutdown"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "zend_execute_API.c",
    "at": "gate",
    "name": "zend_call_function"
   },
   "to": {
    "cls": "zend.c",
    "at": "gate",
    "name": "zend_throw_error"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "zend_execute_API.c",
    "at": "gate",
    "name": "zend_call_function"
   },
   "to": {
    "cls": "zend_alloc.c",
    "at": "gate",
    "name": "zend_handle_delayed_oom"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "zend_execute_API.c",
    "at": "gate",
    "name": "zend_call_function"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release_ex"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "zend_hash.c",
    "at": "gate",
    "name": "zend_hash_del"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release"
   }
  },
  {
   "kind": "call",
   "from": {
    "cls": "zend_hash.c",
    "at": "gate",
    "name": "zend_hash_destroy"
   },
   "to": {
    "cls": "zend_string.h",
    "at": "gate",
    "name": "zend_string_release"
   }
  }
 ]
};
