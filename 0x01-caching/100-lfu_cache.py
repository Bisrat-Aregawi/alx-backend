#!/usr/bin/env python3
""" Module defines LFUCache class
"""
from base_caching import BaseCaching
from typing import Any


class LFUCache(BaseCaching):
    """ LFUCache class

    Attributes:
        cache_data: a dictionary representation of in-memory cache
        occurance_table: a dictionary holding number of calls per key
        MAX_ITEMS: an integer representation of size of cache_data
    """

    occurance_table: dict = {}

    def __init__(self):
        super(LFUCache, self).__init__()

    def put(self, key: Any, item: Any) -> None:
        """ Insert cache entry (key, value) to internal dictionary

        If MAX_ITEMS is exceeded, LFU is enforced
        """
        if key and item is not None:
            try:
                if len(self.cache_data) < self.__class__.MAX_ITEMS:
                    self.cache_data[key] = item
                    self.occurance_table[key] = 0
                elif self.cache_data.get(key) is not None:
                    self.cache_data[key] = item
                    self.occurance_table[key] += 1
                else:
                    raise Exception
            except Exception:
                least_hits = float('inf')
                key_to_remove = ""

                for k, v in self.occurance_table.items():
                    if v < least_hits:
                        least_hits, key_to_remove = v, k

                same_hits = [
                        v for v in self.cache_data.values() if v == least_hits
                        ]

                if len(same_hits) > 1:
                    first_in_key = (self.cache_data.items())[0][0]
                    self.cache_data.pop(
                            first_in_key
                            )
                    print("DISCARD: {}".format(first_in_key))
                else:
                    self.cache_data.pop(key_to_remove)
                    self.occurance_table.pop(key_to_remove)
                    print("DISCARD: {}".format(key_to_remove))

                self.cache_data[key] = item
                self.occurance_table[key] = 0

    def get(self, key: Any) -> Any:
        """ Retrieve value using key

        On every call of this method increment occurance in occurance_table
        """
        if self.cache_data.get(key):
            self.occurance_table[key] += 1
            return self.cache_data.get(key)
