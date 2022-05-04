#!/usr/bin/env python3
""" Module defines `BasicCache` class
"""
from base_caching import BaseCaching
from typing import Any


class BasicCache(BaseCaching):
    """BasicCache class

    Attributes:
        cache_data: a dictionary representation of in-memory cache
    """
    def __init__(self):
        """Initialize"""
        super(BasicCache, self).__init__()

    def put(self, key: Any, item: Any) -> None:
        """ Insert cache entry (key: value) to internal dictionary
        """
        if key and item is not None:
            self.cache_data[key] = item

    def get(self, key: Any) -> Any:
        """ Retrieve value using key"""
        return self.cache_data.get(key)
