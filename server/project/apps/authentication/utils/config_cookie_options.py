def config_cookie_options(key, value, **kwargs):
    # Expiration date
    MONTH = 60*60*24*30

    # Set default values
    kwargs.setdefault('secure', True)
    kwargs.setdefault('samesite', "None")
    kwargs.setdefault('httponly', True)
    kwargs.setdefault('max_age', MONTH)

    cookie_options = {
        "key":key,
        "value":value,
        **kwargs
    }

    return cookie_options