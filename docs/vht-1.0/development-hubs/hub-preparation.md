---
icon: lucide/file-text
---

# Development VeeaHub Preparation

Before it can be used for development, a VeeaHub must be set to allow images and applications to be loaded and run from a local development machine. When configured for development, two services are enabled on the VeeaHub:

1.  The Sideload Server - a service that provides a REST API for interacting with the VeeaHub using the VeeaHub Client (VHC)
    
2.  The Veea Shell - an interactive shell that allows developers to create, run, and interact with images and containers
    

## Configuring a VeeaHub for Development

A VeeaHub can be configured for development in two ways:

1.  Adding a license that allows unauthorized images to be uploaded and run via sideload
    
2.  Adding a partner license (CMS file) that allows authorized images to be uploaded and run via sideload
    

Normally, developers start with the license to allow unauthorized images. Once they are comfortable with VeeaHub development, they request a Partner ID and Partner Credentials to build signed images and applications.

!!! warning
    VeeaHubs that have been configured for development should not be placed directly on the internet. They should be used behind a firewall to prevent unwanted access by hackers.

    This is especially true when running with the license to allow unauthorized images.

Veea Support can assist in configuring a VeeaHub with the license to allow unauthorized images. Once this license is installed, you can upload your partner CMS license using VHC.
