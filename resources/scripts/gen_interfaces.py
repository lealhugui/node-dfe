#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys, inspect

try:
    import pySchema
except:
    print('"pySchema" não foi encontrado ou possui erros.')
    print('Saindo do script...')
    sys.exit(-1)


def collect_classes():
    clsmembers = inspect.getmembers(pySchema, inspect.isclass)
    working_members =  [
        c[1] for c in clsmembers \
        if issubclass(c[1], pySchema.GeneratedsSuper) or 'Type' in c[0]
    ]
    working_members = [
        c for c in working_members if c.__name__ != 'basestring'
    ]
    return working_members


def get_parsed_info(cls):
    result = dict()
    result['name'] = cls.__name__
    result['attrs'] = list()
    black_list_attr = (
        'subclass', 'superclass', '_', 'get_class_obj_', 'get_path_',
        'get_path_list_'
    )
    for attr in inspect.getmembers(cls, lambda a:not(inspect.isroutine(a))):
        if attr[0][0] != '_' and attr[0] not in black_list_attr and \
            'pattern' not in attr[0]:
            result['attrs'].append(attr[0])
    for attr in inspect.getmembers(cls, lambda a:inspect.isroutine(a)):
        if 'get_' in attr[0] and attr[0] not in black_list_attr:
            result['attrs'].append(attr[0].replace('get_', ''))
    return result


def main():
    cls_info = list()
    for t in collect_classes():
        cls_info.append(get_parsed_info(t))
    print(cls_info)

if __name__ == '__main__':
    main()
