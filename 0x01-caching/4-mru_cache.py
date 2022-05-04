#!/usr/bin/env python3
""" Module defines `MRUCache class
"""
from typing import Any
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """MRUCache class

    Attributes:
        cache_data: a dictionary representation of in-memory cache
        MAX_ITEMS: an integer representation of size of cache_data
    """
    def __init__(self):
        """Initialize"""
        super(MRUCache, self).__init__()

    def put(self, key: Any, item: Any) -> None:
        """ Insert cache entry (key: value) to internal dictionary

        If MAX_ITEMS is exceeded, MRU is enforced
        """
        if key and item is not None:
            try:
                if len(self.cache_data) < self.__class__.MAX_ITEMS:
                    self.cache_data[key] = item
                elif self.cache_data.get(key) is not None:
                    self.cache_data.pop(key)
                    self.cache_data[key] = item
                else:
                    raise Exception
            except Exception:
                last_in_key = list(self.cache_data.items())[-1][0]
                self.cache_data.pop(last_in_key)
                print("DISCARD: {}".format(last_in_key))
                self.cache_data[key] = item

    def get(self, key: Any) -> Any:
        """ Retrieve value using key.

        On every call of this method remove called entry from dictionary
        """
        val = self.cache_data.get(key)
        if val:
            self.cache_data.pop(key)
            self.cache_data[key] = val
        return val
