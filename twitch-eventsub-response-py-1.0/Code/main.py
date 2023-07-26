# Import
# -----------------------------------------------------------------------------
from __future__ import annotations
import os
import pathlib
import sys
from typing import Any
#
import ter
import util
# -----------------------------------------------------------------------------


# Version No.
# -----------------------------------------------------------------------------
ver_no: str = '1.0'
# -----------------------------------------------------------------------------


# Main
# -----------------------------------------------------------------------------
# ----------------------------------------------------------------------
def main() -> int:
    n: str = f'--- Twitch EventSub Response Bot (v{ver_no}) ---'
    print(f'{n}')
    #
    print(f'[Preprocess]')
    base_dir: pathlib.Path = pathlib.Path(
        rf'{os.path.abspath(os.path.dirname(sys.argv[0]))}'
    )
    rt_file: pathlib.Path = base_dir.joinpath('restart-flag.txt')
    rt_file.unlink(missing_ok=True)
    #
    cj_file: pathlib.Path = base_dir.joinpath('config.json5')
    print(f'  JSON5 file path = {cj_file}')
    print(f'    parsing this file ... ', end='', )
    cj_obj: dict[str, Any] = util.JSON5Reader.open_and_loads(cj_file)
    cj_obj['ver_no'] = ver_no

  # "responses"に新しいデータを追加
    if "responses" in cj_obj:
        cj_obj["responses"]["!slot"] = [
            [0, "スロットが回ります！"]
        ]
    else:
        cj_obj["responses"] = {
            "!slot": [
                [0, "スロットが回ります！"]
            ]
        }

    print(f'done.')
    print(f'')
    #
    print(f'[Activation of Bot]')
    b: ter.TERBot = ter.TERBot(cj_obj)
    #
    print(f'[Run of Bot]')
    b.run()
    #
    print(f'[Postprocess]')
    if b.return_code == 3:
        rt_file.touch()
    print(f'')
    print(f'-' * len(n))
    return b.return_code
# ----------------------------------------------------------------------


# ----------------------------------------------------------------------
if __name__ == '__main__':
    return_code: int = main()
    sys.exit(return_code)
# ----------------------------------------------------------------------
# -----------------------------------------------------------------------------
