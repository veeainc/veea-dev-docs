---
icon: lucide/file-text
---

# D-Bus Data Types

D-Bus methods are defined using standard type notations, which are shown in the table below.

| Type | Type Code |
| --- | --- |
| BYTE | y |
| BOOLEAN | b |
| INT16 | n |
| UINT16 | q |
| INT32 | i |
| UINT32 | u |
| INT64 | x |
| UINT64 | t |
| DOUBLE | d |
| UINX_FD | h |
| STRING | s |
| OBJECT_PATH | o |
| SIGNATURE | g |
| VARIANT | v, can take any value as the actual type |
| TUPLE | (), where one or more types are placed inside the tuple (e.g., (is) being a tuple of an integer and a string |
| ARRAY | a followed by element type (e.g., as being an array of strings,or a(is) being an array of tuples, where each tuple is an integer and a string |
| DICTIONARY | a{<k><v>}, where <k> is the key type and <v> is the value type (e.g., a{is} being a dictionary mapping integers to strings |
