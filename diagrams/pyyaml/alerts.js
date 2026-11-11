// 脆弱性アラート: 修正後（5.3.1）のモデルの上に、もともと問題のあった場所を点滅で示す。
// role: problem = 問題の箇所（赤で点滅）/ path = 攻撃の通り道（琥珀色でゆっくり脈打つ）/ fix = 修正で加わった・変わった箇所（緑で点灯）
// note は英語（画面とナレーションで使う）。
window.ALERTS = {
  id: "CVE-2020-1747",
  date: "March 2020",
  fixedIn: "5.3.1",
  title: "Arbitrary code execution in FullLoader",
  summary: "Loading an untrusted YAML document with full_load could run arbitrary code. " +
    "A python/object/new tag could put any attribute, even a method such as extend, into a new object's state, " +
    "and PyYAML then called that method itself.",
  // ツアーで警告を語るときに寄る惑星
  focus: "FullConstructor",
  classes: {
    FullConstructor: {
      role: "problem",
      note: "The constructor behind full_load. Its python/object/new tag was the way in.",
      gates: {
        set_python_instance_state: { role: "problem",
          note: "Copied the document's state into the new object without checking names. Since 5.3.1 every key is checked first." },
        construct_python_object_new: { role: "path", note: "Handles the python/object/new tag." },
        construct_python_object_apply: { role: "path",
          note: "Creates the object, sets its state, then calls instance.extend(listitems)." },
        make_python_instance: { role: "path", note: "Creates an instance of any class the document names." },
        get_state_keys_blacklist: { role: "fix", note: "Added in 5.3.1: names that may not be set, extend and __dunder__ names." },
        get_state_keys_blacklist_regexp: { role: "fix", note: "Added in 5.3.1: the blacklist as one regular expression." },
      },
    },
    BaseConstructor: {
      role: "fix",
      note: "Gained the check used by the fix.",
      gates: {
        check_state_key: { role: "fix", note: "Added in 5.3.1: rejects a blacklisted key with a ConstructorError." },
      },
    },
    UnsafeConstructor: {
      role: "fix",
      note: "Keeps the old, unchecked behaviour on purpose. Never use it on untrusted input.",
      gates: {
        set_python_instance_state: { role: "fix", note: "Added in 5.3.1: calls the parent with unsafe=True, skipping the check." },
      },
    },
    FullLoader: {
      role: "path",
      note: "The loader behind yaml.full_load, and the default of yaml.load at the time.",
      gates: {},
    },
  },
};
