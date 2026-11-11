// Tour narration for PyYAML 5.3.1 (English).
// PyYAML has almost no class docstrings, so the short descriptions below fill in for them;
// the numbers (lines, gates, links) are still composed at runtime from the analysis data.
window.NARRATION = {
  // yaml/__init__.py has no module docstring
  packageDoc: "PyYAML reads and writes YAML, the human-friendly data format, for Python.",
  // 脆弱性アラートの場面（全景のすぐあと、FullConstructor に寄って語る）
  alert: "This is PyYAML 5.3.1, the version that fixed CVE-2020-1747, in March 2020. " +
    "Before the fix, loading an untrusted document with full_load could run code chosen by the attacker. " +
    "The weak spot was here, in FullConstructor, at the gate set python instance state, blinking red. " +
    "It copied names from the document into a new object without checking them, so a method like extend could be replaced. " +
    "The amber gates are the path the attack took. The green gates were added by the fix: every name is now checked against a blacklist first.",
  outro: "That is the main path of PyYAML. Click any planet to fly back to it.",
  outroVideo: "That is the main path of PyYAML: from characters, to tokens, to events, to nodes, to Python objects, and back.",
  // Visiting order: the loading path first, then the dumping path.
  order: ["Reader", "Scanner", "Parser", "Composer", "BaseResolver",
          "BaseConstructor", "SafeConstructor", "FullConstructor", "UnsafeConstructor", "FullLoader",
          "BaseRepresenter", "SafeRepresenter", "Representer", "Serializer", "Emitter"],
  fallback: {
    Reader: "Reads the input stream and turns bytes into characters.",
    Scanner: "Turns characters into tokens: keys, values, indentation, scalars.",
    Parser: "Turns tokens into events, such as the start and end of a mapping.",
    Composer: "Turns events into a tree of nodes.",
    BaseResolver: "Decides the tag of each node, for example whether a plain scalar is a number or a string.",
    BaseConstructor: "Turns nodes into Python objects. The base of every constructor.",
    SafeConstructor: "Builds only standard YAML types: numbers, strings, lists, dictionaries, dates.",
    FullConstructor: "Builds standard types and also many Python-specific tags. Used by full_load. This is where the vulnerability was.",
    UnsafeConstructor: "Builds any Python object the document asks for. Never use it on untrusted input.",
    FullLoader: "The loader behind yaml.full_load. It combines the reader, scanner, parser, composer, the full constructor and the resolver.",
    BaseRepresenter: "Turns Python objects back into nodes. The base of every representer.",
    SafeRepresenter: "Represents only standard YAML types.",
    Representer: "Represents Python-specific objects with python tags.",
    Serializer: "Turns nodes into events.",
    Emitter: "Turns events into YAML text.",
  },
};
