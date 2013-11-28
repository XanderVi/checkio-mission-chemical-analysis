from checkio.signals import ON_CONNECT
from checkio import api
from checkio.referees.io import CheckiOReferee
from checkio.referees import cover_codes
from checkio.referees import checkers

from tests import TESTS

api.add_listener(
    ON_CONNECT,
    CheckiOReferee(tests=TESTS).on_ready)
