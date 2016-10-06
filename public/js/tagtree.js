var tree_structure = {
    chart: {
        container: "#OrganiseChart6",
        levelSeparation:    25,
        siblingSeparation:  70,
        subTeeSeparation:   70,
        nodeAlign: "BOTTOM",
        scrollbar: "fancy",
        padding: 35,
        node: { HTMLclass: "evolution-tree" },
        connectors: {
            type: "curve",
            style: {
                "stroke-width": 2,
                "stroke-linecap": "round",
                "stroke": "#ccc"
            }
        }
    },

    nodeStructure: {
        text: { name: "LIFE" },
        HTMLclass: "the-parent",
        children: [
            {
                text: { name: "true bacteria" }
            },
            {
                pseudo: true,
                children: [
                    {
                        text: { name: "archea bacteria" }
                    },
                    {
                        text: { name: "EUKARYOTES" },
                        HTMLclass: "the-parent",
                        children: [
                            {
                                text: { name: "protocists" }
                            },
                            {
                                pseudo: true,
                                children: [
                                    {
                                        text: { name: "PLANTS" },
                                        HTMLclass: "the-parent",
                                        children: [
                                            {
                                                pseudo: true,
                                                children: [
                                                    {
                                                        pseudo: true,
                                                        children: [
                                                            {
                                                                pseudo: true,
                                                                children: [
                                                                    {
                                                                        text: { name: "flowering seed plants" }
                                                                    },
                                                                    {
                                                                        text: { name: "non-flowering seed plants" }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                               text: { name: "ferns and fern allies" }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: { name: "mosses and allies" }
                                                    }
                                                ]
                                            },
                                            {
                                                text: { name: "green algae" }
                                            }
                                        ]
                                    },
                                    {
                                        pseudo: true,
                                        children: [
                                            {
                                                text: { name: "fungi and lichens" }
                                            },
                                            {
                                                text: { name: "ANIMALS" },
                                                HTMLclass: "the-parent",
                                                children: [
                                                    {
                                                        text: { name: "sponges" }
                                                    },
                                                    {
                                                        pseudo: true,
                                                        children: [
                                                            {
                                                                text: { name: "cnidarians" }
                                                            },
                                                            {
                                                                pseudo: true,
                                                                childrenDropLevel: 1,
                                                                children: [
                                                                    {
                                                                        pseudo: true,
                                                                        children: [
                                                                            {
                                                                                text: { name: "echinoderms" }
                                                                            },
                                                                            {
                                                                                text: { name: "VERTEBRATES" },
                                                                                HTMLclass: "the-parent",
                                                                                children: [
                                                                                    {
                                                                                        text: { name: "cartilaginous fish" }
                                                                                    },
                                                                                    {
                                                                                        text: { name: "bony fish" }
                                                                                    },
                                                                                    {
                                                                                        text: { name: "TETRAPODS" },
                                                                                        HTMLclass: "the-parent",
                                                                                        children: [
                                                                                            {
                                                                                                text: { name: "amphibians" }
                                                                                            },
                                                                                            {
                                                                                                text: { name: "AMNIOTES" },
                                                                                                HTMLclass: "the-parent",
                                                                                                children: [
                                                                                                    {
                                                                                                        pseudo: true,
                                                                                                        children: [
                                                                                                            {
                                                                                                                text: { name: "turtles" }
                                                                                                            },
                                                                                                            {
                                                                                                                pseudo: true,
                                                                                                                children: [
                                                                                                                    {
                                                                                                                        text: { name: "snakes and lizards" }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        text: { name: "crocodiles and birds" }
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        text: { name: "mammals" }
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: { name: "ARTHROPODS" },                                                                      
                                                                        HTMLclass: "the-parent",
                                                                        children: [
                                                                            {
                                                                                text: { name: "chelicerates" }
                                                                            },
                                                                            {
                                                                                pseudo: true,
                                                                                stackChildren: true,
                                                                                children: [
                                                                                    {
                                                                                        text: { name: "crustaceans" }
                                                                                    },
                                                                                    {
                                                                                        text: { name: "insects and myriapods" }
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        pseudo: true,
                                                                        children: [
                                                                            {
                                                                                text: { name: "flatworms" }
                                                                            },
                                                                            {
                                                                                text: { name: "lophophorates" }
                                                                            }

                                                                        ]
                                                                    },
                                                                    {
                                                                        pseudo: true,
                                                                        childrenDropLevel: 1,
                                                                        stackChildren: true,
                                                                        children: [
                                                                            {
                                                                                text: { name: "rotifers" }
                                                                            },
                                                                            {
                                                                                text: { name: "roundworms" }
                                                                               
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        pseudo: true,
                                                                        childrenDropLevel: 1,
                                                                        stackChildren: true,
                                                                        children: [
                                                                            {
                                                                                text: { name: "mollusks" }
                                                                               
                                                                            },
                                                                            {
                                                                                text: { name: "segmented worms" }
                                                                                
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};