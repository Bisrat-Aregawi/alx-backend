#!/usr/bin/env python3
"""1-simple_pagination module
"""
import csv
import math
from typing import Dict, List, Tuple


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Return paginated list from dataset

        Args:
            page: Page number requested
            page_size: Number of records to show per page

        Returns:
            Paginated list of records
        """
        assert isinstance(page, int) and page >= 0
        assert isinstance(page_size, int) and page_size > 0

        range = index_range(page, page_size)
        if self.__dataset:
            return self.__dataset[range[0]:range[1]]
        self.dataset()
        return self.__dataset[range[0]:range[1]]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """Return Dictionary

        Args:
            page: Page number requested
            page_size: Number of records to show per page

        Returns:
        """
        data = self.get_page(page, page_size)
        next_page = None
        prev_page = page - 1 if page > 1 else None
        if ((page - 1) * page_size + page_size < len(self.__dataset)):
            next_page = page + 1

        return {
            "page_size": len(data),
            "page": page,
            "data": data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": math.ceil(len(self.__dataset) / page_size)
        }
    pass


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return range of records given required page and its size

    Args:
        page: Page number requested
        page_size: Number of records to show per page

    Returns:
        Tuple of two with beginning and ending index
    """
    initial = (page - 1) * page_size
    final = initial + page_size
    return (initial, final)
