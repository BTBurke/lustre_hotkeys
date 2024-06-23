import gleam/string.{join}
import lustre/attribute.{attribute}
import lustre/element.{type Element, element}
import lustre/event.{on}

pub fn of(keys: List(String), msg: msg) -> Element(msg) {
  let name = register()
  element(
    name,
    [attribute("bind", join(keys, with: "+")), on("fire", fn(_) { Ok(msg) })],
    [],
  )
}

@external(javascript, "./hotkeys.ffi.mjs", "register")
fn register() -> string
