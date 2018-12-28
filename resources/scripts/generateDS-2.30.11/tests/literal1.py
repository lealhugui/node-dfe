#from out2_sup import *

import out2_sup as model_

rootObj = model_.rootClass(
    comments=[
        model_.comments(
            content_ = [
            model_.MixedContainer(1, 0, "", "1. This is a "),
            model_.MixedContainer(2, 2, "emp", "foolish"),
            model_.MixedContainer(1, 0, "", " comment.  It is "),
            model_.MixedContainer(2, 2, "emp", "really"),
            model_.MixedContainer(1, 0, "", " important."),
            ],
            valueOf_ = """1. This is a  comment.  It is  important.""",
        ),
        model_.comments(
            content_ = [
            model_.MixedContainer(1, 0, "", "2. This is a "),
            model_.MixedContainer(2, 2, "emp", "silly"),
            model_.MixedContainer(1, 0, "", " comment.  It is "),
            model_.MixedContainer(2, 2, "emp", "very"),
            model_.MixedContainer(1, 0, "", " significant."),
            ],
            valueOf_ = """2. This is a  comment.  It is  significant.""",
        ),
    ],
    person=[
        model_.person(
            value="abcd",
            id=1,
            ratio=3.200000,
            name='Alberta',
            interest=[
                'gardening',
                'reading',
            ],
            category=5,
            agent=[
            ],
            promoter=[
            ],
        ),
        model_.person(
            id=2,
            name='Bernardo',
            interest=[
                'programming',
            ],
            category=0,
            agent=[
                model_.agent(
                    firstname='Darren',
                    lastname='Diddly',
                    priority=4.500000,
                    info=model_.info(
                        name="Albert Abasinian",
                        type_=321,
                        rating=5.330000,
                    ),
                ),
            ],
            promoter=[
            ],
        ),
        model_.person(
            id=3,
            name='Charlie',
            interest=[
                'people',
                'cats',
                'dogs',
            ],
            category=8,
            agent=[
            ],
            promoter=[
                model_.booster(
                    firstname='David',
                    lastname='Donaldson',
                    other_value=[
                    ],
                    type_=[
                    ],
                    client_handler=[
                    ],
                ),
                model_.booster(
                    firstname='Edward',
                    lastname='Eddleberry',
                    other_value=[
                    ],
                    type_=[
                    ],
                    client_handler=[
                    ],
                ),
            ],
        ),
        model_.person(
            id=4,
        ),
    ],
    programmer=[
        model_.programmer(
            language="python",
            area="xml",
            id=2,
            name='Charles Carlson',
            interest=[
                'programming',
            ],
            category=2233,
            agent=[
                model_.agent(
                    firstname='Ernest',
                    lastname='Echo',
                    priority=3.800000,
                    info=model_.info(
                        name="George Gregory",
                        type_=321,
                        rating=5.330000,
                    ),
                ),
            ],
            promoter=[
            ],
            description='A very happy programmer',
            email='charles@happyprogrammers.com',
            elposint=14,
            elnonposint=0,
            elnegint=-12,
            elnonnegint=4,
            eldate=model_.GeneratedsSuper.gds_parse_date("2005-04-26"),
            eldatetime=model_.GeneratedsSuper.gds_parse_datetime("2005-04-26T10:11:12"),
            eltoken='aa bb cc dd',
            elshort=123,
            ellong=13241234123412341234,
            elparam=model_.param(
                id="id001",
                name="Davy",
                semantic="a big semantic",
                valueOf_ = """""",
            ),
        ),
    ],
    python_programmer=[
        model_.python_programmer(
            nick_name="davy",
            language="python",
            area="xml",
            value="abcd",
            id=232,
            ratio=8.700000,
            fruit="peach",
            vegetable="tomato",
            name='Darrel Dawson',
            interest=[
                'hang gliding',
            ],
            category=3344,
            agent=[
                model_.agent(
                    firstname='Harvey',
                    lastname='Hippolite',
                    priority=5.200000,
                    info=model_.info(
                        name="Harvey Hippolite",
                        type_=543,
                        rating=6.550000,
                    ),
                ),
            ],
            promoter=[
            ],
            description='An object-orientated programmer',
            email='darrel@happyprogrammers.com',
            favorite_editor='jed',
        ),
    ],
    java_programmer=[
        model_.java_programmer(
            nick_name="davy",
            language="python",
            area="xml",
            value="abcd",
            id=232,
            ratio=8.700000,
            fruit="peach",
            vegetable="tomato",
            name='Darrel Dawson',
            interest=[
                'hang gliding',
            ],
            category=3344,
            agent=[
                model_.agent(
                    firstname='Harvey',
                    lastname='Hippolite',
                    priority=5.200000,
                    info=model_.info(
                        name="Harvey Hippolite",
                        type_=543,
                        rating=6.550000,
                    ),
                ),
            ],
            promoter=[
            ],
            description='An object-orientated programmer',
            email='darrel@happyprogrammers.com',
            favorite_editor='jed',
        ),
    ],
)
