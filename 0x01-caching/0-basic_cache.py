#!/usr/bin/env python3
""" Module defines `BasicCache` class
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """docstring for BasicCache."""
    def __init__(self):
        """Initialize"""
        super(BasicCache, self).__init__()

    def put(self, key, item):
        if key and item != None:
            self.cache_data[key] = item

    def get(self, key):
        return self.cache_data.get(key)
