# -*- coding: utf-8 -*-
import pytz

# Assume the calendar is for Europeans only (as it currently has only Polish language).
TIMEZONE_CONTINENT = "Europe"
# Assume the application is for Poles mostly (as it currently has only Polish language).
DEFAULT_TIMEZONE = "Europe/Warsaw"

SYSTEM_TIMEZONE = "Europe/Warsaw"


def get_timezones():
    """
    Return timezones. Only one continent will suffice for the scope of the exercise.
    """
    return tuple([(x, x) for x in pytz.all_timezones if TIMEZONE_CONTINENT in x])


def datetime_now_not_naive():
    """
    have to clean migrations!
    """
    pass
