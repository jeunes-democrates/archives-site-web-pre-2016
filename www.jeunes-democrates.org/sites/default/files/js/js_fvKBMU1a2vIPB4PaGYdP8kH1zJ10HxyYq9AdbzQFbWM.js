/* Copyright (c) 2006-2012 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes.js
 * @requires OpenLayers/Console.js
 */

/**
 * Namespace: OpenLayers.Lang
 * Internationalization namespace.  Contains dictionaries in various languages
 *     and methods to set and get the current language.
 */
OpenLayers.Lang = {
    
    /** 
     * Property: code
     * {String}  Current language code to use in OpenLayers.  Use the
     *     <setCode> method to set this value and the <getCode> method to
     *     retrieve it.
     */
    code: null,

    /** 
     * APIProperty: defaultCode
     * {String} Default language to use when a specific language can't be
     *     found.  Default is "en".
     */
    defaultCode: "en",
        
    /**
     * APIFunction: getCode
     * Get the current language code.
     *
     * Returns:
     * {String} The current language code.
     */
    getCode: function() {
        if(!OpenLayers.Lang.code) {
            OpenLayers.Lang.setCode();
        }
        return OpenLayers.Lang.code;
    },
    
    /**
     * APIFunction: setCode
     * Set the language code for string translation.  This code is used by
     *     the <OpenLayers.Lang.translate> method.
     *
     * Parameters:
     * code - {String} These codes follow the IETF recommendations at
     *     http://www.ietf.org/rfc/rfc3066.txt.  If no value is set, the
     *     browser's language setting will be tested.  If no <OpenLayers.Lang>
     *     dictionary exists for the code, the <OpenLayers.String.defaultLang>
     *     will be used.
     */
    setCode: function(code) {
        var lang;
        if(!code) {
            code = (OpenLayers.BROWSER_NAME == "msie") ?
                navigator.userLanguage : navigator.language;
        }
        var parts = code.split('-');
        parts[0] = parts[0].toLowerCase();
        if(typeof OpenLayers.Lang[parts[0]] == "object") {
            lang = parts[0];
        }

        // check for regional extensions
        if(parts[1]) {
            var testLang = parts[0] + '-' + parts[1].toUpperCase();
            if(typeof OpenLayers.Lang[testLang] == "object") {
                lang = testLang;
            }
        }
        if(!lang) {
            OpenLayers.Console.warn(
                'Failed to find OpenLayers.Lang.' + parts.join("-") +
                ' dictionary, falling back to default language'
            );
            lang = OpenLayers.Lang.defaultCode;
        }
        
        OpenLayers.Lang.code = lang;
    },

    /**
     * APIMethod: translate
     * Looks up a key from a dictionary based on the current language string.
     *     The value of <getCode> will be used to determine the appropriate
     *     dictionary.  Dictionaries are stored in <OpenLayers.Lang>.
     *
     * Parameters:
     * key - {String} The key for an i18n string value in the dictionary.
     * context - {Object} Optional context to be used with
     *     <OpenLayers.String.format>.
     * 
     * Returns:
     * {String} A internationalized string.
     */
    translate: function(key, context) {
        var dictionary = OpenLayers.Lang[OpenLayers.Lang.getCode()];
        var message = dictionary && dictionary[key];
        if(!message) {
            // Message not found, fall back to message key
            message = key;
        }
        if(context) {
            message = OpenLayers.String.format(message, context);
        }
        return message;
    }
    
};


/**
 * APIMethod: OpenLayers.i18n
 * Alias for <OpenLayers.Lang.translate>.  Looks up a key from a dictionary
 *     based on the current language string. The value of
 *     <OpenLayers.Lang.getCode> will be used to determine the appropriate
 *     dictionary.  Dictionaries are stored in <OpenLayers.Lang>.
 *
 * Parameters:
 * key - {String} The key for an i18n string value in the dictionary.
 * context - {Object} Optional context to be used with
 *     <OpenLayers.String.format>.
 * 
 * Returns:
 * {String} A internationalized string.
 */
OpenLayers.i18n = OpenLayers.Lang.translate;
;
/* Translators (2009 onwards):
 *  - Damouns
 *  - IAlex
 */

/**
 * @requires OpenLayers/Lang.js
 */

/**
 * Namespace: OpenLayers.Lang["fr"]
 * Dictionary for Français.  Keys for entries are used in calls to
 *     <OpenLayers.Lang.translate>.  Entry bodies are normal strings or
 *     strings formatted for use with <OpenLayers.String.format> calls.
 */
OpenLayers.Lang["fr"] = OpenLayers.Util.applyDefaults({

    'unhandledRequest': "Requête non gérée, retournant ${statusText}",

    'Permalink': "Permalien",

    'Overlays': "Calques",

    'Base Layer': "Calque de base",

    'noFID': "Impossible de mettre à jour un objet sans identifiant (fid).",

    'browserNotSupported': "Votre navigateur ne supporte pas le rendu vectoriel. Les renderers actuellement supportés sont : \n${renderers}",

    'minZoomLevelError': "La propriété minZoomLevel doit seulement être utilisée pour des couches FixedZoomLevels-descendent. Le fait que cette couche WFS vérifie la présence de minZoomLevel est une relique du passé. Nous ne pouvons toutefois la supprimer sans casser des applications qui pourraient en dépendre. C\'est pourquoi nous la déprécions -- la vérification du minZoomLevel sera supprimée en version 3.0. A la place, merci d\'utiliser les paramètres de résolutions min/max tel que décrit sur : http://trac.openlayers.org/wiki/SettingZoomLevels",

    'commitSuccess': "Transaction WFS : SUCCES ${response}",

    'commitFailed': "Transaction WFS : ECHEC ${response}",

    'googleWarning': "La couche Google n\'a pas été en mesure de se charger correctement.\x3cbr\x3e\x3cbr\x3ePour supprimer ce message, choisissez une nouvelle BaseLayer dans le sélecteur de couche en haut à droite.\x3cbr\x3e\x3cbr\x3eCela est possiblement causé par la non-inclusion de la librairie Google Maps, ou alors parce que la clé de l\'API ne correspond pas à votre site.\x3cbr\x3e\x3cbr\x3eDéveloppeurs : pour savoir comment corriger ceci, \x3ca href=\'http://trac.openlayers.org/wiki/Google\' target=\'_blank\'\x3ecliquez ici\x3c/a\x3e",

    'getLayerWarning': "La couche ${layerType} n\'est pas en mesure de se charger correctement.\x3cbr\x3e\x3cbr\x3ePour supprimer ce message, choisissez une nouvelle BaseLayer dans le sélecteur de couche en haut à droite.\x3cbr\x3e\x3cbr\x3eCela est possiblement causé par la non-inclusion de la librairie ${layerLib}.\x3cbr\x3e\x3cbr\x3eDéveloppeurs : pour savoir comment corriger ceci, \x3ca href=\'http://trac.openlayers.org/wiki/${layerLib}\' target=\'_blank\'\x3ecliquez ici\x3c/a\x3e",

    'Scale = 1 : ${scaleDenom}': "Echelle ~ 1 : ${scaleDenom}",

    'W': "O",

    'E': "E",

    'N': "N",

    'S': "S",

    'reprojectDeprecated': "Vous utilisez l\'option \'reproject\' sur la couche ${layerName}. Cette option est dépréciée : Son usage permettait d\'afficher des données au dessus de couches raster commerciales.Cette fonctionalité est maintenant supportée en utilisant le support de la projection Mercator Sphérique. Plus d\'information est disponible sur http://trac.openlayers.org/wiki/SphericalMercator.",

    'methodDeprecated': "Cette méthode est dépréciée, et sera supprimée à la version 3.0. Merci d\'utiliser ${newMethod} à la place.",

    'proxyNeeded': "Vous avez très probablement besoin de renseigner OpenLayers.ProxyHost pour accéder à ${url}. Voir http://trac.osgeo.org/openlayers/wiki/FrequentlyAskedQuestions#ProxyHost"
});
;
/*jslint white: false */
/*jslint forin: true */
/*global OpenLayers Drupal $ document jQuery window */

/**
 * @file
 * This file holds the main javascript API for OpenLayers. It is
 * responsable for loading and displaying the map.
 *
 * @ingroup openlayers
 */

/**
 * This is a workaround for a bug involving IE and VML support.
 * See the Drupal Book page describing this problem:
 * http://drupal.org/node/613002
 */

document.namespaces;

(function($) {

Drupal.settings.openlayers = {};
Drupal.settings.openlayers.maps = {};

/**
 * Minimal OpenLayers map bootstrap.
 * All additional operations occur in additional Drupal behaviors.
 */
Drupal.behaviors.openlayers = {
  'attach': function(context, settings) {
    Drupal.openlayers.loadProjections(context, settings);

    if (typeof(Drupal.settings.openlayers) === 'object' &&
        Drupal.settings.openlayers.maps &&
        !$(context).data('openlayers')) {
      $('.openlayers-map').once('openlayers-map', function() {
        // By setting the stop_render variable to TRUE, this will
        // halt the render process.  If set, one could remove this setting
        // then call Drupal.attachBehaviors again to get it started
        var map_id = $(this).attr('id');
        if (Drupal.settings.openlayers.maps[map_id] && Drupal.settings.openlayers.maps[map_id].stop_render != true) {
          var map = Drupal.settings.openlayers.maps[map_id];

          if(map.default_layer===null){
            Drupal.openlayers.console.error("Map configuration is invalid as it lacks a base layer.");
          }

          // Use try..catch for error handling.
          try {
            // Set OpenLayers language based on document language,
            // rather than browser language
            OpenLayers.Lang.setCode($('html').attr('lang'));

            var options = {};
            // This is necessary because the input JSON cannot contain objects
            options.projection = new OpenLayers.Projection(map.projection);
            options.displayProjection = new OpenLayers.Projection(map.displayProjection);

            // Restrict map to its extent (usually projection extent).
            options.maxExtent = OpenLayers.Bounds.fromArray(map.maxExtent);

            options.maxResolution = 'auto';
            options.controls = [];

            // Change image, CSS, and proxy paths if specified
            if (map.image_path) {
              OpenLayers.ImgPath = Drupal.openlayers.relatePath(map.image_path,
                Drupal.settings.basePath);
            }
            if (map.css_path) {
              options.theme = Drupal.openlayers.relatePath(map.css_path,
                Drupal.settings.basePath);
            }
            if (map.proxy_host) {
              OpenLayers.ProxyHost = Drupal.openlayers.relatePath(map.proxy_host,
                Drupal.settings.basePath);
            }

            // Initialize openlayers map
            var openlayers = new OpenLayers.Map(map_id, options);

            // Run the layer addition first
            Drupal.openlayers.addLayers(map, openlayers);

            // Ensure redraw as maps stays blank until first zoom otherwise (observed with EPSG:2056)
            openlayers.moveTo(openlayers.getCenter(), openlayers.getZoom(), {
              forceZoomChange: true
            });

            // Attach data to map DOM object
            $(this).data('openlayers', {'map': map, 'openlayers': openlayers});

            // Finally, attach behaviors
            Drupal.attachBehaviors(this);
          }
          catch (e) {
            var errorMessage = e.name + ': ' + e.message;
            if (typeof console != 'undefined') {
              Drupal.openlayers.console.log(errorMessage);
            }
            else {
              $(this).text('Error during map rendering: ' + errorMessage);
            }
          }
        }
      });
    }
  }
};

/**
 * Collection of helper methods.
 */
Drupal.openlayers = {
  // Determine path based on format.
  'relatePath': function(path, basePath) {
    // Check for a full URL or an absolute path.
    if (path.indexOf('://') >= 0 || path.indexOf('/') == 0) {
      return path;
    }
    else {
      return basePath + path;
    }
  },
  /*
   * Redraw Vectors.
   * This is necessary because various version of IE cannot draw vectors on
   * $(document).ready()
   */
  'redrawVectors': function() {
    $(window).load(
      function() {
        var map;
        for (map in Drupal.settings.openlayers.maps) {
          $.each($('#' + map).data('openlayers')
            .openlayers.getLayersByClass('OpenLayers.Layer.Vector'),
            function(i, layer) {
              layer.redraw();
            }
          );
        }
      }
    );
  },
  /**
   * Add layers to the map
   *
   * @param map Drupal settings object for the map.
   * @param openlayers OpenLayers Map Object.
   */
  'addLayers': function(map, openlayers) {

    var sorted = [];
    for (var name in map.layers) {
      sorted.push({'name': name, 'weight': map.layers[name].weight, 'isBaseLayer': map.layers[name].isBaseLayer });
    }

    sorted.sort(function(a, b) {
      var x = parseInt(a.weight, 10), y = parseInt(b.weight, 10);
      return ((a.isBaseLayer && x < y) ? -1 : ((b.isBaseLayer || x > y) ? 1 : 0));
    });

    for (var i = 0; i < sorted.length; ++i) {
      var layer,
        name = sorted[i].name,
        options = map.layers[name];

      // Add reference to our layer ID
      options.drupalID = name;
      // Ensure that the layer handler is available
      if (options.layer_handler !== undefined &&
        Drupal.openlayers.layer[options.layer_handler] !== undefined) {
        layer = Drupal.openlayers.layer[options.layer_handler](map.layers[name].title, map, options);

        layer.visibility = !!(!map.layer_activated || map.layer_activated[name]);

        if (layer.isBaseLayer === false) {
          layer.displayInLayerSwitcher = (!map.layer_switcher || map.layer_switcher[name]);
        }

        openlayers.addLayer(layer);
      }
    }

    openlayers.setBaseLayer(openlayers.getLayersBy('drupalID', map.default_layer)[0]);

    // Set the restricted extent if wanted.
    // Prevents the map from being panned outside of a specfic bounding box.
    if (typeof map.center.restrict !== 'undefined' && map.center.restrict.restrictextent) {
      var desiredRestriction = OpenLayers.Bounds.fromString(
          map.center.restrict.restrictedExtent
      ).transform(new OpenLayers.Projection('EPSG:3857'), openlayers.projection);

      if(desiredRestriction.left>=openlayers.maxExtent.left && desiredRestriction.right<=openlayers.maxExtent.right
        && desiredRestriction.top<=openlayers.maxExtent.top && desiredRestriction.bottom>=openlayers.maxExtent.bottom){

        openlayers.restrictedExtent = desiredRestriction;
      } else {
        // Given the map to set the restricted extent is not dependent on the map projection
        // it does allow to set an extent outwith the valid bound of the map projection. As a
        // result no valid data could be requested and thus the wrong extent needs to be ignored.
        Drupal.openlayers.console.error("Restricted bounds ignored as not within projection bounds.");
      }
    }

    // Zoom & center
    if (map.center.initial) {
      var center = OpenLayers.LonLat.fromString(map.center.initial.centerpoint).transform(
        new OpenLayers.Projection('EPSG:4326'),
        new OpenLayers.Projection(map.projection));
      var zoom = parseInt(map.center.initial.zoom, 10);
      openlayers.setCenter(center, zoom, false, false);
    }
  },
  /**
   * Abstraction of OpenLayer's feature adding syntax to work with Drupal output.
   * Ideally this should be rolled into the PHP code, because we don't want to manually
   * parse WKT
   */
  'addFeatures': function(map, layer, features) {
    var newFeatures = [];

    // Go through features
    for (var key in features) {
      var feature = features[key];
      var newFeatureObject = this.objectFromFeature(feature);

      // If we have successfully extracted geometry add additional
      // properties and queue it for addition to the layer
      if (newFeatureObject) {
        var newFeatureSet = [];

        // Check to see if it is a new feature, or an array of new features.
        if (typeof(newFeatureObject[0]) === 'undefined') {
          newFeatureSet[0] = newFeatureObject;
        }
        else {
          newFeatureSet = newFeatureObject;
        }

        // Go through new features
        for (var i = 0; i < newFeatureSet.length; i++) {
          var newFeature = newFeatureSet[i];

          // Transform the geometry if the 'projection' property is different from the map projection
          if (feature.projection) {
            if (feature.projection !== map.projection) {
              var featureProjection = new OpenLayers.Projection(feature.projection);
              var mapProjection = new OpenLayers.Projection(map.projection);
              newFeature.geometry.transform(featureProjection, mapProjection);
            }
          }

          // Add attribute data
          if (feature.attributes) {
            // Attributes belong to features, not single component geometries
            // of them. But we're creating a geometry for each component for
            // better performance and clustering support. Let's call these
            // "pseudofeatures".
            //
            // In order to identify the real feature each geometry belongs to
            // we then add a 'fid' parameter to the "pseudofeature".
            // NOTE: 'drupalFID' is only unique within a single layer.
            newFeature.attributes = feature.attributes;
            newFeature.data = feature.attributes;
            newFeature.drupalFID = key;
          }

          // Add style information
          if (feature.style) {
            newFeature.style = jQuery.extend({},
                OpenLayers.Feature.Vector.style['default'],
                feature.style);
          }

          // Push new features
          newFeatures.push(newFeature);
        }
      }
    }

    // Add new features if there are any
    if (newFeatures.length !== 0) {
      layer.addFeatures(newFeatures);
    }
  },

  'getStyleMap': function(map, layername) {
    if (map.styles) {
      var stylesAdded = {};

      // Grab and map base styles.
      for (var style in map.styles) {
        stylesAdded[style] = new OpenLayers.Style(map.styles[style]);
      }

      // Implement layer-specific styles.  First default, then select.
      if (map.layer_styles !== undefined && map.layer_styles[layername]) {
        var style = map.layer_styles[layername];
        stylesAdded['default'] = new OpenLayers.Style(map.styles[style]);
      }
      if (map.layer_styles_select !== undefined && map.layer_styles_select[layername]) {
        var style = map.layer_styles_select[layername];
        stylesAdded['select'] = new OpenLayers.Style(map.styles[style]);
      }
      if (map.layer_styles_temporary !== undefined && map.layer_styles_temporary[layername]) {
        var style = map.layer_styles_temporary[layername];
        stylesAdded['temporary'] = new OpenLayers.Style(map.styles[style]);
      }

      return new OpenLayers.StyleMap(stylesAdded);
    }
    else {
      return new OpenLayers.StyleMap({
        'default': new OpenLayers.Style({
          pointRadius: 5,
          fillColor: '#ffcc66',
          strokeColor: '#ff9933',
          strokeWidth: 4,
          fillOpacity: 0.5
        }),
        'select': new OpenLayers.Style({
          fillColor: '#66ccff',
          strokeColor: '#3399ff'
        })
      });
    }
  },

  'objectFromFeature': function(feature) {
    var wktFormat = new OpenLayers.Format.WKT();
    // Extract geometry either from wkt property or lon/lat properties
    if (feature.wkt) {
      return wktFormat.read(feature.wkt);
    }
    else if (feature.lon) {
      return wktFormat.read('POINT(' + feature.lon + ' ' + feature.lat + ')');
    }
  },

  /**
   * Add Behavior.
   *
   * This is a wrapper around adding behaviors for OpenLayers.
   * a module does not have to use this, but it helps cut
   * down on code.
   *
   * @param id
   *   The identifier of the behavior that is attached to
   *   the map.
   * @param attach
   *   The callback function for the attach part of the
   *   Drupal behavior.
   * @param detach
   *   The callback function for the detach part of the
   *   Drupal behavior.
   */
  'addBehavior': function(id, attach, detach) {
    // Add as a Drupal behavior.  Add a prefix, just to be safe.
    Drupal.behaviors['openlayers_auto_' + id] = {
      attach: function (context, settings) {
        var data = $(context).data('openlayers');

        // Ensure that there is a map and that the appropriate
        // behavior exists.  Need "data &&" to avoid js crash
        // when data is empty
        var localBehavior = data && data.map.behaviors[id];

        // Ensure scope in the attach callback
        var that = this;
        if (localBehavior) {
          $(context).once('openlayers-' + id, function () {
            attach.apply(that, [data, data.map.behaviors[id], context, settings]);
          });
        }
      },
      // Maybe we need a little more handling here.
      detach: detach
    };
  },

  /**
   * Add Control.
   *
   * This is a wrapper around adding controls to maps.  It
   * is not needed but saves some code.
   */
  'addControl': function(openlayers, controlName, options) {
    var control = new OpenLayers.Control[controlName](options);
    openlayers.addControl(control);
    control.activate();
    return control;
  },

  /**
   * Instructs the Proj4js module to make projection definitions available
   * to Proj4js and thus OpenLayers, too.
   *
   * Triggering the initialization of Proj4js this way guarantees projection
   * definitions are available.
   */
  'loadProjections': function(context, settings){
    // Proj4js is not necessarily present as we only load it when OpenLayers
    // can't handle the projections is use without its help.
    if(Drupal.behaviors.proj4js){
      Drupal.behaviors.proj4js.attach(context, settings);
    }
  },

  /**
   * Logging implementation that logs using the browser's logging API.
   * Falls back to doing nothing in case no such API is available. Simulates
   * the presece of Firebug's console API in Drupal.openlayers.console.
   */
  'console': (function(){
    var api = {};
    var logger;
    if(typeof(console)==="object" && typeof(console.log)==="function"){
      logger = function(){
        // Use console.log as fallback for missing parts of API if present.
        console.log.apply(console, arguments);
      }
    } else {
      logger = function (){
        // Ignore call as no logging facility is available.
      };
    }
    jQuery(["log", "debug", "info", "warn", "exception", "assert", "dir",
      "dirxml", "trace", "group", "groupEnd", "groupCollapsed", "profile",
      "profileEnd", "count", "clear", "time", "timeEnd", "timeStamp", "table",
      "error"]).each(function(index, functionName){
      if(typeof(console)!=="object" || typeof(console[functionName])!=="function"){
        // Use fallback as browser does not provide implementation.
        api[functionName] = logger;
      } else {
        api[functionName] = function(){
          // Use browsers implementation.
          console[functionName].apply(console, arguments);
        };
      }
    });
    return api;
  })()
};

Drupal.openlayers.layer = {};
})(jQuery);
;

/**
 * OpenLayers Views Vector Layer Handler
 */
Drupal.openlayers.layer.openlayers_views_vector = function(title, map, options) {
  // More explanations on this at: https://drupal.org/node/1993172#comment-7819199
  if (typeof(Drupal.settings.openlayers.maps[map.id]) !== undefined) {
    Drupal.settings.openlayers.maps[map.id] = undefined;
  }

  // Note, so that we do not pass all the features along to the Layer
  // options, we use the options.options to give to Layer
  options.options.drupalID = options.drupalID;
  // Allow to set z-order of features (#2241477)
  options.options.rendererOptions = {yOrdering: true};
  // Create projection
  options.projection = new OpenLayers.Projection(options.projection);
  // Get style map
  options.options.styleMap = Drupal.openlayers.getStyleMap(map, options.drupalID);
  // Create layer object
  var layer = new OpenLayers.Layer.Vector(title, options.options);

  // Add features if there are any
  if (options.features) {
    Drupal.openlayers.addFeatures(map, layer, options.features);
  }

  return layer;
};
;

/**
 * @file
 * Layer handler for TMS layers
 */

/**
 * Openlayer layer handler for TMS layer
 */
Drupal.openlayers.layer.tms = function(title, map, options) {
  if (OpenLayers.Util.isArray(options.maxExtent)) {
    options.maxExtent = OpenLayers.Bounds.fromArray(options.maxExtent);
  }

  if (options.maptiler == true) {
    options.getURL = function(bounds) {
      var res = this.map.getResolution();
      var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
      var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
      var z = this.map.getZoom();
      if (x >= 0 && y >= 0) {
        return this.url + z + "/" + x + "/" + y + "." + this.type;
      } else {
        return "http://www.maptiler.org/img/none.png";
      }
    }
  }

  options.projection = new OpenLayers.Projection(options.projection);
  return new OpenLayers.Layer.TMS(title, options.url, options);
};
;
/**
 * @file
 * JS Implementation of OpenLayers behavior.
 */

/**
 * Navigation Behavior
 */
Drupal.openlayers.addBehavior('openlayers_behavior_navigation', function (data, options) {
  options.documentDrag = !!options.documentDrag;
  Drupal.openlayers.addControl(data.openlayers, 'Navigation', options);
});
;
/**
 * @file
 * JS Implementation of OpenLayers behavior.
 */

/**
 * Pan Zoom Bar Behavior
 */
Drupal.openlayers.addBehavior('openlayers_behavior_panzoombar', function (data, options) {
  Drupal.openlayers.addControl(data.openlayers, 'PanZoomBar', options);
});
;
(function ($) {

  Drupal.behaviors.proj4js = {
    attach: function (context, settings) {
      for (var i in settings.proj4js) {
        Proj4js.defs[settings.proj4js[i][0]] = settings.proj4js[i][1];
      }
    }
  };

})(jQuery);
;
/*
  proj4js.js -- Javascript reprojection library. 
  
  Authors:      Mike Adair madairATdmsolutions.ca
                Richard Greenwood richATgreenwoodmap.com
                Didier Richard didier.richardATign.fr
                Stephen Irons stephen.ironsATclear.net.nz
                Olivier Terral oterralATgmail.com
                
  License:      
 Copyright (c) 2012, Mike Adair, Richard Greenwood, Didier Richard, 
                     Stephen Irons and Olivier Terral

 Permission is hereby granted, free of charge, to any person obtaining a
 copy of this software and associated documentation files (the "Software"),
 to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense,
 and/or sell copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included
 in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 DEALINGS IN THE SOFTWARE.
 
 Note: This program is an almost direct port of the C library PROJ.4.
*/
var Proj4js={defaultDatum:"WGS84",transform:function(a,c,b){if(!a.readyToUse)return this.reportError("Proj4js initialization for:"+a.srsCode+" not yet complete"),b;if(!c.readyToUse)return this.reportError("Proj4js initialization for:"+c.srsCode+" not yet complete"),b;if(a.datum&&c.datum&&((a.datum.datum_type==Proj4js.common.PJD_3PARAM||a.datum.datum_type==Proj4js.common.PJD_7PARAM)&&"WGS84"!=c.datumCode||(c.datum.datum_type==Proj4js.common.PJD_3PARAM||c.datum.datum_type==Proj4js.common.PJD_7PARAM)&&
"WGS84"!=a.datumCode)){var d=Proj4js.WGS84;this.transform(a,d,b);a=d}"enu"!=a.axis&&this.adjust_axis(a,!1,b);"longlat"==a.projName?(b.x*=Proj4js.common.D2R,b.y*=Proj4js.common.D2R):(a.to_meter&&(b.x*=a.to_meter,b.y*=a.to_meter),a.inverse(b));a.from_greenwich&&(b.x+=a.from_greenwich);b=this.datum_transform(a.datum,c.datum,b);c.from_greenwich&&(b.x-=c.from_greenwich);"longlat"==c.projName?(b.x*=Proj4js.common.R2D,b.y*=Proj4js.common.R2D):(c.forward(b),c.to_meter&&(b.x/=c.to_meter,b.y/=c.to_meter));
"enu"!=c.axis&&this.adjust_axis(c,!0,b);return b},datum_transform:function(a,c,b){if(a.compare_datums(c)||a.datum_type==Proj4js.common.PJD_NODATUM||c.datum_type==Proj4js.common.PJD_NODATUM)return b;if(a.es!=c.es||a.a!=c.a||a.datum_type==Proj4js.common.PJD_3PARAM||a.datum_type==Proj4js.common.PJD_7PARAM||c.datum_type==Proj4js.common.PJD_3PARAM||c.datum_type==Proj4js.common.PJD_7PARAM)a.geodetic_to_geocentric(b),(a.datum_type==Proj4js.common.PJD_3PARAM||a.datum_type==Proj4js.common.PJD_7PARAM)&&a.geocentric_to_wgs84(b),
(c.datum_type==Proj4js.common.PJD_3PARAM||c.datum_type==Proj4js.common.PJD_7PARAM)&&c.geocentric_from_wgs84(b),c.geocentric_to_geodetic(b);return b},adjust_axis:function(a,c,b){for(var d=b.x,e=b.y,f=b.z||0,g,i,h=0;3>h;h++)if(!c||!(2==h&&void 0===b.z))switch(0==h?(g=d,i="x"):1==h?(g=e,i="y"):(g=f,i="z"),a.axis[h]){case "e":b[i]=g;break;case "w":b[i]=-g;break;case "n":b[i]=g;break;case "s":b[i]=-g;break;case "u":void 0!==b[i]&&(b.z=g);break;case "d":void 0!==b[i]&&(b.z=-g);break;default:return alert("ERROR: unknow axis ("+
a.axis[h]+") - check definition of "+a.projName),null}return b},reportError:function(){},extend:function(a,c){a=a||{};if(c)for(var b in c){var d=c[b];void 0!==d&&(a[b]=d)}return a},Class:function(){for(var a=function(){this.initialize.apply(this,arguments)},c={},b,d=0;d<arguments.length;++d)b="function"==typeof arguments[d]?arguments[d].prototype:arguments[d],Proj4js.extend(c,b);a.prototype=c;return a},bind:function(a,c){var b=Array.prototype.slice.apply(arguments,[2]);return function(){var d=b.concat(Array.prototype.slice.apply(arguments,
[0]));return a.apply(c,d)}},scriptName:"proj4js-compressed.js",defsLookupService:"http://spatialreference.org/ref",libPath:null,getScriptLocation:function(){if(this.libPath)return this.libPath;for(var a=this.scriptName,c=a.length,b=document.getElementsByTagName("script"),d=0;d<b.length;d++){var e=b[d].getAttribute("src");if(e){var f=e.lastIndexOf(a);if(-1<f&&f+c==e.length){this.libPath=e.slice(0,-c);break}}}return this.libPath||""},loadScript:function(a,c,b,d){var e=document.createElement("script");
e.defer=!1;e.type="text/javascript";e.id=a;e.src=a;e.onload=c;e.onerror=b;e.loadCheck=d;/MSIE/.test(navigator.userAgent)&&(e.onreadystatechange=this.checkReadyState);document.getElementsByTagName("head")[0].appendChild(e)},checkReadyState:function(){if("loaded"==this.readyState)if(this.loadCheck())this.onload();else this.onerror()}};
Proj4js.Proj=Proj4js.Class({readyToUse:!1,title:null,projName:null,units:null,datum:null,x0:0,y0:0,localCS:!1,queue:null,initialize:function(a,c){this.srsCodeInput=a;this.queue=[];c&&this.queue.push(c);if(0<=a.indexOf("GEOGCS")||0<=a.indexOf("GEOCCS")||0<=a.indexOf("PROJCS")||0<=a.indexOf("LOCAL_CS"))this.parseWKT(a),this.deriveConstants(),this.loadProjCode(this.projName);else{if(0==a.indexOf("urn:")){var b=a.split(":");if(("ogc"==b[1]||"x-ogc"==b[1])&&"def"==b[2]&&"crs"==b[3])a=b[4]+":"+b[b.length-
1]}else 0==a.indexOf("http://")&&(b=a.split("#"),b[0].match(/epsg.org/)?a="EPSG:"+b[1]:b[0].match(/RIG.xml/)&&(a="IGNF:"+b[1]));this.srsCode=a.toUpperCase();0==this.srsCode.indexOf("EPSG")?(this.srsCode=this.srsCode,this.srsAuth="epsg",this.srsProjNumber=this.srsCode.substring(5)):0==this.srsCode.indexOf("IGNF")?(this.srsCode=this.srsCode,this.srsAuth="IGNF",this.srsProjNumber=this.srsCode.substring(5)):0==this.srsCode.indexOf("CRS")?(this.srsCode=this.srsCode,this.srsAuth="CRS",this.srsProjNumber=
this.srsCode.substring(4)):(this.srsAuth="",this.srsProjNumber=this.srsCode);this.loadProjDefinition()}},loadProjDefinition:function(){if(Proj4js.defs[this.srsCode])this.defsLoaded();else{var a=Proj4js.getScriptLocation()+"defs/"+this.srsAuth.toUpperCase()+this.srsProjNumber+".js";Proj4js.loadScript(a,Proj4js.bind(this.defsLoaded,this),Proj4js.bind(this.loadFromService,this),Proj4js.bind(this.checkDefsLoaded,this))}},loadFromService:function(){Proj4js.loadScript(Proj4js.defsLookupService+"/"+this.srsAuth+
"/"+this.srsProjNumber+"/proj4js/",Proj4js.bind(this.defsLoaded,this),Proj4js.bind(this.defsFailed,this),Proj4js.bind(this.checkDefsLoaded,this))},defsLoaded:function(){this.parseDefs();this.loadProjCode(this.projName)},checkDefsLoaded:function(){return Proj4js.defs[this.srsCode]?!0:!1},defsFailed:function(){Proj4js.reportError("failed to load projection definition for: "+this.srsCode);Proj4js.defs[this.srsCode]=Proj4js.defs.WGS84;this.defsLoaded()},loadProjCode:function(a){if(Proj4js.Proj[a])this.initTransforms();
else{var c=Proj4js.getScriptLocation()+"projCode/"+a+".js";Proj4js.loadScript(c,Proj4js.bind(this.loadProjCodeSuccess,this,a),Proj4js.bind(this.loadProjCodeFailure,this,a),Proj4js.bind(this.checkCodeLoaded,this,a))}},loadProjCodeSuccess:function(a){Proj4js.Proj[a].dependsOn?this.loadProjCode(Proj4js.Proj[a].dependsOn):this.initTransforms()},loadProjCodeFailure:function(a){Proj4js.reportError("failed to find projection file for: "+a)},checkCodeLoaded:function(a){return Proj4js.Proj[a]?!0:!1},initTransforms:function(){Proj4js.extend(this,
Proj4js.Proj[this.projName]);this.init();this.readyToUse=!0;if(this.queue)for(var a;a=this.queue.shift();)a.call(this,this)},wktRE:/^(\w+)\[(.*)\]$/,parseWKT:function(a){if(a=a.match(this.wktRE)){var c=a[1],b=a[2].split(","),d;d="TOWGS84"==c.toUpperCase()?c:b.shift();d=d.replace(/^\"/,"");d=d.replace(/\"$/,"");for(var a=[],e=0,f="",g=0;g<b.length;++g){for(var i=b[g],h=0;h<i.length;++h)"["==i.charAt(h)&&++e,"]"==i.charAt(h)&&--e;f+=i;0===e?(a.push(f),f=""):f+=","}switch(c){case "LOCAL_CS":this.projName=
"identity";this.localCS=!0;this.srsCode=d;break;case "GEOGCS":this.projName="longlat";this.geocsCode=d;this.srsCode||(this.srsCode=d);break;case "PROJCS":this.srsCode=d;break;case "PROJECTION":this.projName=Proj4js.wktProjections[d];break;case "DATUM":this.datumName=d;break;case "LOCAL_DATUM":this.datumCode="none";break;case "SPHEROID":this.ellps=d;this.a=parseFloat(a.shift());this.rf=parseFloat(a.shift());break;case "PRIMEM":this.from_greenwich=parseFloat(a.shift());break;case "UNIT":this.units=
d;this.unitsPerMeter=parseFloat(a.shift());break;case "PARAMETER":c=d.toLowerCase();b=parseFloat(a.shift());switch(c){case "false_easting":this.x0=b;break;case "false_northing":this.y0=b;break;case "scale_factor":this.k0=b;break;case "central_meridian":this.long0=b*Proj4js.common.D2R;break;case "latitude_of_origin":this.lat0=b*Proj4js.common.D2R}break;case "TOWGS84":this.datum_params=a;break;case "AXIS":c=d.toLowerCase();b=a.shift();switch(b){case "EAST":b="e";break;case "WEST":b="w";break;case "NORTH":b=
"n";break;case "SOUTH":b="s";break;case "UP":b="u";break;case "DOWN":b="d";break;default:b=" "}this.axis||(this.axis="enu");switch(c){case "x":this.axis=b+this.axis.substr(1,2);break;case "y":this.axis=this.axis.substr(0,1)+b+this.axis.substr(2,1);break;case "z":this.axis=this.axis.substr(0,2)+b}}for(g=0;g<a.length;++g)this.parseWKT(a[g])}},parseDefs:function(){this.defData=Proj4js.defs[this.srsCode];var a,c;if(this.defData){for(var b=this.defData.split("+"),d=0;d<b.length;d++)switch(c=b[d].split("="),
a=c[0].toLowerCase(),c=c[1],a.replace(/\s/gi,"")){case "title":this.title=c;break;case "proj":this.projName=c.replace(/\s/gi,"");break;case "units":this.units=c.replace(/\s/gi,"");break;case "datum":this.datumCode=c.replace(/\s/gi,"");break;case "nadgrids":this.nagrids=c.replace(/\s/gi,"");break;case "ellps":this.ellps=c.replace(/\s/gi,"");break;case "a":this.a=parseFloat(c);break;case "b":this.b=parseFloat(c);break;case "rf":this.rf=parseFloat(c);break;case "lat_0":this.lat0=c*Proj4js.common.D2R;
break;case "lat_1":this.lat1=c*Proj4js.common.D2R;break;case "lat_2":this.lat2=c*Proj4js.common.D2R;break;case "lat_ts":this.lat_ts=c*Proj4js.common.D2R;break;case "lon_0":this.long0=c*Proj4js.common.D2R;break;case "alpha":this.alpha=parseFloat(c)*Proj4js.common.D2R;break;case "lonc":this.longc=c*Proj4js.common.D2R;break;case "x_0":this.x0=parseFloat(c);break;case "y_0":this.y0=parseFloat(c);break;case "k_0":this.k0=parseFloat(c);break;case "k":this.k0=parseFloat(c);break;case "r_a":this.R_A=!0;break;
case "zone":this.zone=parseInt(c,10);break;case "south":this.utmSouth=!0;break;case "towgs84":this.datum_params=c.split(",");break;case "to_meter":this.to_meter=parseFloat(c);break;case "from_greenwich":this.from_greenwich=c*Proj4js.common.D2R;break;case "pm":c=c.replace(/\s/gi,"");this.from_greenwich=Proj4js.PrimeMeridian[c]?Proj4js.PrimeMeridian[c]:parseFloat(c);this.from_greenwich*=Proj4js.common.D2R;break;case "axis":c=c.replace(/\s/gi,""),3==c.length&&-1!="ewnsud".indexOf(c.substr(0,1))&&-1!=
"ewnsud".indexOf(c.substr(1,1))&&-1!="ewnsud".indexOf(c.substr(2,1))&&(this.axis=c)}this.deriveConstants()}},deriveConstants:function(){"@null"==this.nagrids&&(this.datumCode="none");if(this.datumCode&&"none"!=this.datumCode){var a=Proj4js.Datum[this.datumCode];a&&(this.datum_params=a.towgs84?a.towgs84.split(","):null,this.ellps=a.ellipse,this.datumName=a.datumName?a.datumName:this.datumCode)}this.a||Proj4js.extend(this,Proj4js.Ellipsoid[this.ellps]?Proj4js.Ellipsoid[this.ellps]:Proj4js.Ellipsoid.WGS84);
this.rf&&!this.b&&(this.b=(1-1/this.rf)*this.a);if(0===this.rf||Math.abs(this.a-this.b)<Proj4js.common.EPSLN)this.sphere=!0,this.b=this.a;this.a2=this.a*this.a;this.b2=this.b*this.b;this.es=(this.a2-this.b2)/this.a2;this.e=Math.sqrt(this.es);this.R_A&&(this.a*=1-this.es*(Proj4js.common.SIXTH+this.es*(Proj4js.common.RA4+this.es*Proj4js.common.RA6)),this.a2=this.a*this.a,this.b2=this.b*this.b,this.es=0);this.ep2=(this.a2-this.b2)/this.b2;this.k0||(this.k0=1);this.axis||(this.axis="enu");this.datum=
new Proj4js.datum(this)}});Proj4js.Proj.longlat={init:function(){},forward:function(a){return a},inverse:function(a){return a}};Proj4js.Proj.identity=Proj4js.Proj.longlat;
Proj4js.defs={WGS84:"+title=long/lat:WGS84 +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees","EPSG:4326":"+title=long/lat:WGS84 +proj=longlat +a=6378137.0 +b=6356752.31424518 +ellps=WGS84 +datum=WGS84 +units=degrees","EPSG:4269":"+title=long/lat:NAD83 +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees","EPSG:3875":"+title= Google Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"};
Proj4js.defs["EPSG:3785"]=Proj4js.defs["EPSG:3875"];Proj4js.defs.GOOGLE=Proj4js.defs["EPSG:3875"];Proj4js.defs["EPSG:900913"]=Proj4js.defs["EPSG:3875"];Proj4js.defs["EPSG:102113"]=Proj4js.defs["EPSG:3875"];
Proj4js.common={PI:3.141592653589793,HALF_PI:1.5707963267948966,TWO_PI:6.283185307179586,FORTPI:0.7853981633974483,R2D:57.29577951308232,D2R:0.017453292519943295,SEC_TO_RAD:4.84813681109536E-6,EPSLN:1.0E-10,MAX_ITER:20,COS_67P5:0.3826834323650898,AD_C:1.0026,PJD_UNKNOWN:0,PJD_3PARAM:1,PJD_7PARAM:2,PJD_GRIDSHIFT:3,PJD_WGS84:4,PJD_NODATUM:5,SRS_WGS84_SEMIMAJOR:6378137,SIXTH:0.16666666666666666,RA4:0.04722222222222222,RA6:0.022156084656084655,RV4:0.06944444444444445,RV6:0.04243827160493827,msfnz:function(a,
c,b){a*=c;return b/Math.sqrt(1-a*a)},tsfnz:function(a,c,b){b*=a;b=Math.pow((1-b)/(1+b),0.5*a);return Math.tan(0.5*(this.HALF_PI-c))/b},phi2z:function(a,c){for(var b=0.5*a,d,e=this.HALF_PI-2*Math.atan(c),f=0;15>=f;f++)if(d=a*Math.sin(e),d=this.HALF_PI-2*Math.atan(c*Math.pow((1-d)/(1+d),b))-e,e+=d,1.0E-10>=Math.abs(d))return e;alert("phi2z has NoConvergence");return-9999},qsfnz:function(a,c){var b;return 1.0E-7<a?(b=a*c,(1-a*a)*(c/(1-b*b)-0.5/a*Math.log((1-b)/(1+b)))):2*c},asinz:function(a){1<Math.abs(a)&&
(a=1<a?1:-1);return Math.asin(a)},e0fn:function(a){return 1-0.25*a*(1+a/16*(3+1.25*a))},e1fn:function(a){return 0.375*a*(1+0.25*a*(1+0.46875*a))},e2fn:function(a){return 0.05859375*a*a*(1+0.75*a)},e3fn:function(a){return a*a*a*(35/3072)},mlfn:function(a,c,b,d,e){return a*e-c*Math.sin(2*e)+b*Math.sin(4*e)-d*Math.sin(6*e)},srat:function(a,c){return Math.pow((1-a)/(1+a),c)},sign:function(a){return 0>a?-1:1},adjust_lon:function(a){return a=Math.abs(a)<this.PI?a:a-this.sign(a)*this.TWO_PI},adjust_lat:function(a){return a=
Math.abs(a)<this.HALF_PI?a:a-this.sign(a)*this.PI},latiso:function(a,c,b){if(Math.abs(c)>this.HALF_PI)return+Number.NaN;if(c==this.HALF_PI)return Number.POSITIVE_INFINITY;if(c==-1*this.HALF_PI)return-1*Number.POSITIVE_INFINITY;b*=a;return Math.log(Math.tan((this.HALF_PI+c)/2))+a*Math.log((1-b)/(1+b))/2},fL:function(a,c){return 2*Math.atan(a*Math.exp(c))-this.HALF_PI},invlatiso:function(a,c){var b=this.fL(1,c),d=0,e=0;do d=b,e=a*Math.sin(d),b=this.fL(Math.exp(a*Math.log((1+e)/(1-e))/2),c);while(1.0E-12<
Math.abs(b-d));return b},sinh:function(a){a=Math.exp(a);return(a-1/a)/2},cosh:function(a){a=Math.exp(a);return(a+1/a)/2},tanh:function(a){a=Math.exp(a);return(a-1/a)/(a+1/a)},asinh:function(a){return(0<=a?1:-1)*Math.log(Math.abs(a)+Math.sqrt(a*a+1))},acosh:function(a){return 2*Math.log(Math.sqrt((a+1)/2)+Math.sqrt((a-1)/2))},atanh:function(a){return Math.log((a-1)/(a+1))/2},gN:function(a,c,b){c*=b;return a/Math.sqrt(1-c*c)},pj_enfn:function(a){var c=[];c[0]=this.C00-a*(this.C02+a*(this.C04+a*(this.C06+
a*this.C08)));c[1]=a*(this.C22-a*(this.C04+a*(this.C06+a*this.C08)));var b=a*a;c[2]=b*(this.C44-a*(this.C46+a*this.C48));b*=a;c[3]=b*(this.C66-a*this.C68);c[4]=b*a*this.C88;return c},pj_mlfn:function(a,c,b,d){b*=c;c*=c;return d[0]*a-b*(d[1]+c*(d[2]+c*(d[3]+c*d[4])))},pj_inv_mlfn:function(a,c,b){for(var d=1/(1-c),e=a,f=Proj4js.common.MAX_ITER;f;--f){var g=Math.sin(e),i=1-c*g*g,i=(this.pj_mlfn(e,g,Math.cos(e),b)-a)*i*Math.sqrt(i)*d,e=e-i;if(Math.abs(i)<Proj4js.common.EPSLN)return e}Proj4js.reportError("cass:pj_inv_mlfn: Convergence error");
return e},C00:1,C02:0.25,C04:0.046875,C06:0.01953125,C08:0.01068115234375,C22:0.75,C44:0.46875,C46:0.013020833333333334,C48:0.007120768229166667,C66:0.3645833333333333,C68:0.005696614583333333,C88:0.3076171875};
Proj4js.datum=Proj4js.Class({initialize:function(a){this.datum_type=Proj4js.common.PJD_WGS84;a.datumCode&&"none"==a.datumCode&&(this.datum_type=Proj4js.common.PJD_NODATUM);if(a&&a.datum_params){for(var c=0;c<a.datum_params.length;c++)a.datum_params[c]=parseFloat(a.datum_params[c]);if(0!=a.datum_params[0]||0!=a.datum_params[1]||0!=a.datum_params[2])this.datum_type=Proj4js.common.PJD_3PARAM;if(3<a.datum_params.length&&(0!=a.datum_params[3]||0!=a.datum_params[4]||0!=a.datum_params[5]||0!=a.datum_params[6]))this.datum_type=
Proj4js.common.PJD_7PARAM,a.datum_params[3]*=Proj4js.common.SEC_TO_RAD,a.datum_params[4]*=Proj4js.common.SEC_TO_RAD,a.datum_params[5]*=Proj4js.common.SEC_TO_RAD,a.datum_params[6]=a.datum_params[6]/1E6+1}a&&(this.a=a.a,this.b=a.b,this.es=a.es,this.ep2=a.ep2,this.datum_params=a.datum_params)},compare_datums:function(a){return this.datum_type!=a.datum_type||this.a!=a.a||5.0E-11<Math.abs(this.es-a.es)?!1:this.datum_type==Proj4js.common.PJD_3PARAM?this.datum_params[0]==a.datum_params[0]&&this.datum_params[1]==
a.datum_params[1]&&this.datum_params[2]==a.datum_params[2]:this.datum_type==Proj4js.common.PJD_7PARAM?this.datum_params[0]==a.datum_params[0]&&this.datum_params[1]==a.datum_params[1]&&this.datum_params[2]==a.datum_params[2]&&this.datum_params[3]==a.datum_params[3]&&this.datum_params[4]==a.datum_params[4]&&this.datum_params[5]==a.datum_params[5]&&this.datum_params[6]==a.datum_params[6]:this.datum_type==Proj4js.common.PJD_GRIDSHIFT||a.datum_type==Proj4js.common.PJD_GRIDSHIFT?(alert("ERROR: Grid shift transformations are not implemented."),
!1):!0},geodetic_to_geocentric:function(a){var c=a.x,b=a.y,d=a.z?a.z:0,e,f,g;if(b<-Proj4js.common.HALF_PI&&b>-1.001*Proj4js.common.HALF_PI)b=-Proj4js.common.HALF_PI;else if(b>Proj4js.common.HALF_PI&&b<1.001*Proj4js.common.HALF_PI)b=Proj4js.common.HALF_PI;else if(b<-Proj4js.common.HALF_PI||b>Proj4js.common.HALF_PI)return Proj4js.reportError("geocent:lat out of range:"+b),null;c>Proj4js.common.PI&&(c-=2*Proj4js.common.PI);f=Math.sin(b);g=Math.cos(b);e=this.a/Math.sqrt(1-this.es*f*f);b=(e+d)*g*Math.cos(c);
c=(e+d)*g*Math.sin(c);d=(e*(1-this.es)+d)*f;a.x=b;a.y=c;a.z=d;return 0},geocentric_to_geodetic:function(a){var c,b,d,e,f,g,i,h,j,k,l=a.x;d=a.y;var m=a.z?a.z:0;c=Math.sqrt(l*l+d*d);b=Math.sqrt(l*l+d*d+m*m);if(1.0E-12>c/this.a){if(l=0,1.0E-12>b/this.a)return}else l=Math.atan2(d,l);d=m/b;e=c/b;f=1/Math.sqrt(1-this.es*(2-this.es)*e*e);i=e*(1-this.es)*f;h=d*f;k=0;do k++,g=this.a/Math.sqrt(1-this.es*h*h),b=c*i+m*h-g*(1-this.es*h*h),g=this.es*g/(g+b),f=1/Math.sqrt(1-g*(2-g)*e*e),g=e*(1-g)*f,f*=d,j=f*i-g*
h,i=g,h=f;while(1.0E-24<j*j&&30>k);c=Math.atan(f/Math.abs(g));a.x=l;a.y=c;a.z=b;return a},geocentric_to_geodetic_noniter:function(a){var c=a.x,b=a.y,d=a.z?a.z:0,e,f,g,i,h,c=parseFloat(c),b=parseFloat(b),d=parseFloat(d);h=!1;if(0!=c)e=Math.atan2(b,c);else if(0<b)e=Proj4js.common.HALF_PI;else if(0>b)e=-Proj4js.common.HALF_PI;else if(h=!0,e=0,0<d)f=Proj4js.common.HALF_PI;else if(0>d)f=-Proj4js.common.HALF_PI;else return;g=c*c+b*b;c=Math.sqrt(g);b=d*Proj4js.common.AD_C;g=Math.sqrt(b*b+g);b/=g;g=c/g;b=
d+this.b*this.ep2*b*b*b;i=c-this.a*this.es*g*g*g;g=Math.sqrt(b*b+i*i);b/=g;g=i/g;i=this.a/Math.sqrt(1-this.es*b*b);d=g>=Proj4js.common.COS_67P5?c/g-i:g<=-Proj4js.common.COS_67P5?c/-g-i:d/b+i*(this.es-1);!1==h&&(f=Math.atan(b/g));a.x=e;a.y=f;a.z=d;return a},geocentric_to_wgs84:function(a){if(this.datum_type==Proj4js.common.PJD_3PARAM)a.x+=this.datum_params[0],a.y+=this.datum_params[1],a.z+=this.datum_params[2];else if(this.datum_type==Proj4js.common.PJD_7PARAM){var c=this.datum_params[3],b=this.datum_params[4],
d=this.datum_params[5],e=this.datum_params[6],f=e*(d*a.x+a.y-c*a.z)+this.datum_params[1],c=e*(-b*a.x+c*a.y+a.z)+this.datum_params[2];a.x=e*(a.x-d*a.y+b*a.z)+this.datum_params[0];a.y=f;a.z=c}},geocentric_from_wgs84:function(a){if(this.datum_type==Proj4js.common.PJD_3PARAM)a.x-=this.datum_params[0],a.y-=this.datum_params[1],a.z-=this.datum_params[2];else if(this.datum_type==Proj4js.common.PJD_7PARAM){var c=this.datum_params[3],b=this.datum_params[4],d=this.datum_params[5],e=this.datum_params[6],f=(a.x-
this.datum_params[0])/e,g=(a.y-this.datum_params[1])/e,e=(a.z-this.datum_params[2])/e;a.x=f+d*g-b*e;a.y=-d*f+g+c*e;a.z=b*f-c*g+e}}});
Proj4js.Point=Proj4js.Class({initialize:function(a,c,b){"object"==typeof a?(this.x=a[0],this.y=a[1],this.z=a[2]||0):"string"==typeof a&&"undefined"==typeof c?(a=a.split(","),this.x=parseFloat(a[0]),this.y=parseFloat(a[1]),this.z=parseFloat(a[2])||0):(this.x=a,this.y=c,this.z=b||0)},clone:function(){return new Proj4js.Point(this.x,this.y,this.z)},toString:function(){return"x="+this.x+",y="+this.y},toShortString:function(){return this.x+", "+this.y}});
Proj4js.PrimeMeridian={greenwich:0,lisbon:-9.131906111111,paris:2.337229166667,bogota:-74.080916666667,madrid:-3.687938888889,rome:12.452333333333,bern:7.439583333333,jakarta:106.807719444444,ferro:-17.666666666667,brussels:4.367975,stockholm:18.058277777778,athens:23.7163375,oslo:10.722916666667};
Proj4js.Ellipsoid={MERIT:{a:6378137,rf:298.257,ellipseName:"MERIT 1983"},SGS85:{a:6378136,rf:298.257,ellipseName:"Soviet Geodetic System 85"},GRS80:{a:6378137,rf:298.257222101,ellipseName:"GRS 1980(IUGG, 1980)"},IAU76:{a:6378140,rf:298.257,ellipseName:"IAU 1976"},airy:{a:6377563.396,b:6356256.91,ellipseName:"Airy 1830"},"APL4.":{a:6378137,rf:298.25,ellipseName:"Appl. Physics. 1965"},NWL9D:{a:6378145,rf:298.25,ellipseName:"Naval Weapons Lab., 1965"},mod_airy:{a:6377340.189,b:6356034.446,ellipseName:"Modified Airy"},
andrae:{a:6377104.43,rf:300,ellipseName:"Andrae 1876 (Den., Iclnd.)"},aust_SA:{a:6378160,rf:298.25,ellipseName:"Australian Natl & S. Amer. 1969"},GRS67:{a:6378160,rf:298.247167427,ellipseName:"GRS 67(IUGG 1967)"},bessel:{a:6377397.155,rf:299.1528128,ellipseName:"Bessel 1841"},bess_nam:{a:6377483.865,rf:299.1528128,ellipseName:"Bessel 1841 (Namibia)"},clrk66:{a:6378206.4,b:6356583.8,ellipseName:"Clarke 1866"},clrk80:{a:6378249.145,rf:293.4663,ellipseName:"Clarke 1880 mod."},CPM:{a:6375738.7,rf:334.29,
ellipseName:"Comm. des Poids et Mesures 1799"},delmbr:{a:6376428,rf:311.5,ellipseName:"Delambre 1810 (Belgium)"},engelis:{a:6378136.05,rf:298.2566,ellipseName:"Engelis 1985"},evrst30:{a:6377276.345,rf:300.8017,ellipseName:"Everest 1830"},evrst48:{a:6377304.063,rf:300.8017,ellipseName:"Everest 1948"},evrst56:{a:6377301.243,rf:300.8017,ellipseName:"Everest 1956"},evrst69:{a:6377295.664,rf:300.8017,ellipseName:"Everest 1969"},evrstSS:{a:6377298.556,rf:300.8017,ellipseName:"Everest (Sabah & Sarawak)"},
fschr60:{a:6378166,rf:298.3,ellipseName:"Fischer (Mercury Datum) 1960"},fschr60m:{a:6378155,rf:298.3,ellipseName:"Fischer 1960"},fschr68:{a:6378150,rf:298.3,ellipseName:"Fischer 1968"},helmert:{a:6378200,rf:298.3,ellipseName:"Helmert 1906"},hough:{a:6378270,rf:297,ellipseName:"Hough"},intl:{a:6378388,rf:297,ellipseName:"International 1909 (Hayford)"},kaula:{a:6378163,rf:298.24,ellipseName:"Kaula 1961"},lerch:{a:6378139,rf:298.257,ellipseName:"Lerch 1979"},mprts:{a:6397300,rf:191,ellipseName:"Maupertius 1738"},
new_intl:{a:6378157.5,b:6356772.2,ellipseName:"New International 1967"},plessis:{a:6376523,rf:6355863,ellipseName:"Plessis 1817 (France)"},krass:{a:6378245,rf:298.3,ellipseName:"Krassovsky, 1942"},SEasia:{a:6378155,b:6356773.3205,ellipseName:"Southeast Asia"},walbeck:{a:6376896,b:6355834.8467,ellipseName:"Walbeck"},WGS60:{a:6378165,rf:298.3,ellipseName:"WGS 60"},WGS66:{a:6378145,rf:298.25,ellipseName:"WGS 66"},WGS72:{a:6378135,rf:298.26,ellipseName:"WGS 72"},WGS84:{a:6378137,rf:298.257223563,ellipseName:"WGS 84"},
sphere:{a:6370997,b:6370997,ellipseName:"Normal Sphere (r=6370997)"}};
Proj4js.Datum={WGS84:{towgs84:"0,0,0",ellipse:"WGS84",datumName:"WGS84"},GGRS87:{towgs84:"-199.87,74.79,246.62",ellipse:"GRS80",datumName:"Greek_Geodetic_Reference_System_1987"},NAD83:{towgs84:"0,0,0",ellipse:"GRS80",datumName:"North_American_Datum_1983"},NAD27:{nadgrids:"@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",ellipse:"clrk66",datumName:"North_American_Datum_1927"},potsdam:{towgs84:"606.0,23.0,413.0",ellipse:"bessel",datumName:"Potsdam Rauenberg 1950 DHDN"},carthage:{towgs84:"-263.0,6.0,431.0",
ellipse:"clark80",datumName:"Carthage 1934 Tunisia"},hermannskogel:{towgs84:"653.0,-212.0,449.0",ellipse:"bessel",datumName:"Hermannskogel"},ire65:{towgs84:"482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",ellipse:"mod_airy",datumName:"Ireland 1965"},nzgd49:{towgs84:"59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",ellipse:"intl",datumName:"New Zealand Geodetic Datum 1949"},OSGB36:{towgs84:"446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",ellipse:"airy",datumName:"Airy 1830"}};
Proj4js.WGS84=new Proj4js.Proj("WGS84");Proj4js.Datum.OSB36=Proj4js.Datum.OSGB36;Proj4js.wktProjections={"Lambert Tangential Conformal Conic Projection":"lcc",Mercator:"merc","Popular Visualisation Pseudo Mercator":"merc",Mercator_1SP:"merc",Transverse_Mercator:"tmerc","Transverse Mercator":"tmerc","Lambert Azimuthal Equal Area":"laea","Universal Transverse Mercator System":"utm"};
Proj4js.Proj.aea={init:function(){Math.abs(this.lat1+this.lat2)<Proj4js.common.EPSLN?Proj4js.reportError("aeaInitEqualLatitudes"):(this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e3=Math.sqrt(this.es),this.sin_po=Math.sin(this.lat1),this.cos_po=Math.cos(this.lat1),this.con=this.t1=this.sin_po,this.ms1=Proj4js.common.msfnz(this.e3,this.sin_po,this.cos_po),this.qs1=Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po),this.sin_po=Math.sin(this.lat2),this.cos_po=Math.cos(this.lat2),this.t2=
this.sin_po,this.ms2=Proj4js.common.msfnz(this.e3,this.sin_po,this.cos_po),this.qs2=Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po),this.sin_po=Math.sin(this.lat0),this.cos_po=Math.cos(this.lat0),this.t3=this.sin_po,this.qs0=Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po),this.ns0=Math.abs(this.lat1-this.lat2)>Proj4js.common.EPSLN?(this.ms1*this.ms1-this.ms2*this.ms2)/(this.qs2-this.qs1):this.con,this.c=this.ms1*this.ms1+this.ns0*this.qs1,this.rh=this.a*Math.sqrt(this.c-this.ns0*this.qs0)/
this.ns0)},forward:function(a){var c=a.x,b=a.y;this.sin_phi=Math.sin(b);this.cos_phi=Math.cos(b);var b=Proj4js.common.qsfnz(this.e3,this.sin_phi,this.cos_phi),b=this.a*Math.sqrt(this.c-this.ns0*b)/this.ns0,d=this.ns0*Proj4js.common.adjust_lon(c-this.long0),c=b*Math.sin(d)+this.x0,b=this.rh-b*Math.cos(d)+this.y0;a.x=c;a.y=b;return a},inverse:function(a){var c,b,d;a.x-=this.x0;a.y=this.rh-a.y+this.y0;0<=this.ns0?(c=Math.sqrt(a.x*a.x+a.y*a.y),b=1):(c=-Math.sqrt(a.x*a.x+a.y*a.y),b=-1);d=0;0!=c&&(d=Math.atan2(b*
a.x,b*a.y));b=c*this.ns0/this.a;c=(this.c-b*b)/this.ns0;1.0E-10<=this.e3?(b=1-0.5*(1-this.es)*Math.log((1-this.e3)/(1+this.e3))/this.e3,b=1.0E-10<Math.abs(Math.abs(b)-Math.abs(c))?this.phi1z(this.e3,c):0<=c?0.5*Proj4js.common.PI:-0.5*Proj4js.common.PI):b=this.phi1z(this.e3,c);d=Proj4js.common.adjust_lon(d/this.ns0+this.long0);a.x=d;a.y=b;return a},phi1z:function(a,c){var b,d,e,f,g=Proj4js.common.asinz(0.5*c);if(a<Proj4js.common.EPSLN)return g;for(var i=a*a,h=1;25>=h;h++)if(b=Math.sin(g),d=Math.cos(g),
e=a*b,f=1-e*e,b=0.5*f*f/d*(c/(1-i)-b/f+0.5/a*Math.log((1-e)/(1+e))),g+=b,1.0E-7>=Math.abs(b))return g;Proj4js.reportError("aea:phi1z:Convergence error");return null}};
Proj4js.Proj.sterea={dependsOn:"gauss",init:function(){Proj4js.Proj.gauss.init.apply(this);this.rc?(this.sinc0=Math.sin(this.phic0),this.cosc0=Math.cos(this.phic0),this.R2=2*this.rc,this.title||(this.title="Oblique Stereographic Alternative")):Proj4js.reportError("sterea:init:E_ERROR_0")},forward:function(a){var c,b,d,e;a.x=Proj4js.common.adjust_lon(a.x-this.long0);Proj4js.Proj.gauss.forward.apply(this,[a]);c=Math.sin(a.y);b=Math.cos(a.y);d=Math.cos(a.x);e=this.k0*this.R2/(1+this.sinc0*c+this.cosc0*
b*d);a.x=e*b*Math.sin(a.x);a.y=e*(this.cosc0*c-this.sinc0*b*d);a.x=this.a*a.x+this.x0;a.y=this.a*a.y+this.y0;return a},inverse:function(a){var c,b,d,e;a.x=(a.x-this.x0)/this.a;a.y=(a.y-this.y0)/this.a;a.x/=this.k0;a.y/=this.k0;(e=Math.sqrt(a.x*a.x+a.y*a.y))?(d=2*Math.atan2(e,this.R2),c=Math.sin(d),b=Math.cos(d),d=Math.asin(b*this.sinc0+a.y*c*this.cosc0/e),c=Math.atan2(a.x*c,e*this.cosc0*b-a.y*this.sinc0*c)):(d=this.phic0,c=0);a.x=c;a.y=d;Proj4js.Proj.gauss.inverse.apply(this,[a]);a.x=Proj4js.common.adjust_lon(a.x+
this.long0);return a}};function phi4z(a,c,b,d,e,f,g,i,h){var j,k,l,m,n,o,h=f;for(o=1;15>=o;o++)if(j=Math.sin(h),l=Math.tan(h),i=l*Math.sqrt(1-a*j*j),k=Math.sin(2*h),m=c*h-b*k+d*Math.sin(4*h)-e*Math.sin(6*h),n=c-2*b*Math.cos(2*h)+4*d*Math.cos(4*h)-6*e*Math.cos(6*h),j=2*m+i*(m*m+g)-2*f*(i*m+1),l=a*k*(m*m+g-2*f*m)/(2*i),i=2*(f-m)*(i*n-2/k)-2*n,j/=l+i,h+=j,1.0E-10>=Math.abs(j))return h;Proj4js.reportError("phi4z: No convergence");return null}
function e4fn(a){var c;c=1+a;a=1-a;return Math.sqrt(Math.pow(c,c)*Math.pow(a,a))}
Proj4js.Proj.poly={init:function(){0==this.lat0&&(this.lat0=90);this.temp=this.b/this.a;this.es=1-Math.pow(this.temp,2);this.e=Math.sqrt(this.es);this.e0=Proj4js.common.e0fn(this.es);this.e1=Proj4js.common.e1fn(this.es);this.e2=Proj4js.common.e2fn(this.es);this.e3=Proj4js.common.e3fn(this.es);this.ml0=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat0)},forward:function(a){var c,b,d,e,f;d=a.y;b=Proj4js.common.adjust_lon(a.x-this.long0);1.0E-7>=Math.abs(d)?(f=this.x0+this.a*b,c=this.y0-
this.a*this.ml0):(c=Math.sin(d),b=Math.cos(d),d=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,d),e=Proj4js.common.msfnz(this.e,c,b),b=c,f=this.x0+this.a*e*Math.sin(b)/c,c=this.y0+this.a*(d-this.ml0+e*(1-Math.cos(b))/c));a.x=f;a.y=c;return a},inverse:function(a){var c,b;a.x-=this.x0;a.y-=this.y0;c=this.ml0+a.y/this.a;if(1.0E-7>=Math.abs(c))c=a.x/this.a+this.long0,b=0;else{c=c*c+a.x/this.a*(a.x/this.a);c=phi4z(this.es,this.e0,this.e1,this.e2,this.e3,this.al,c,void 0,b);if(1!=c)return c;c=Proj4js.common.adjust_lon(Proj4js.common.asinz(NaN*
a.x/this.a)/Math.sin(b)+this.long0)}a.x=c;a.y=b;return a}};
Proj4js.Proj.equi={init:function(){this.x0||(this.x0=0);this.y0||(this.y0=0);this.lat0||(this.lat0=0);this.long0||(this.long0=0)},forward:function(a){var c=a.y,b=this.x0+this.a*Proj4js.common.adjust_lon(a.x-this.long0)*Math.cos(this.lat0),c=this.y0+this.a*c;this.t1=b;this.t2=Math.cos(this.lat0);a.x=b;a.y=c;return a},inverse:function(a){a.x-=this.x0;a.y-=this.y0;var c=a.y/this.a;Math.abs(c)>Proj4js.common.HALF_PI&&Proj4js.reportError("equi:Inv:DataError");var b=Proj4js.common.adjust_lon(this.long0+
a.x/(this.a*Math.cos(this.lat0)));a.x=b;a.y=c}};
Proj4js.Proj.merc={init:function(){this.lat_ts&&(this.k0=this.sphere?Math.cos(this.lat_ts):Proj4js.common.msfnz(this.es,Math.sin(this.lat_ts),Math.cos(this.lat_ts)))},forward:function(a){var c=a.x,b=a.y;if(90<b*Proj4js.common.R2D&&-90>b*Proj4js.common.R2D&&180<c*Proj4js.common.R2D&&-180>c*Proj4js.common.R2D)return Proj4js.reportError("merc:forward: llInputOutOfRange: "+c+" : "+b),null;if(Math.abs(Math.abs(b)-Proj4js.common.HALF_PI)<=Proj4js.common.EPSLN)return Proj4js.reportError("merc:forward: ll2mAtPoles"),null;
if(this.sphere)c=this.x0+this.a*this.k0*Proj4js.common.adjust_lon(c-this.long0),b=this.y0+this.a*this.k0*Math.log(Math.tan(Proj4js.common.FORTPI+0.5*b));else var d=Math.sin(b),b=Proj4js.common.tsfnz(this.e,b,d),c=this.x0+this.a*this.k0*Proj4js.common.adjust_lon(c-this.long0),b=this.y0-this.a*this.k0*Math.log(b);a.x=c;a.y=b;return a},inverse:function(a){var c=a.x-this.x0,b=a.y-this.y0;if(this.sphere)b=Proj4js.common.HALF_PI-2*Math.atan(Math.exp(-b/this.a*this.k0));else if(b=Math.exp(-b/(this.a*this.k0)),
b=Proj4js.common.phi2z(this.e,b),-9999==b)return Proj4js.reportError("merc:inverse: lat = -9999"),null;c=Proj4js.common.adjust_lon(this.long0+c/(this.a*this.k0));a.x=c;a.y=b;return a}};Proj4js.Proj.utm={dependsOn:"tmerc",init:function(){this.zone?(this.lat0=0,this.long0=(6*Math.abs(this.zone)-183)*Proj4js.common.D2R,this.x0=5E5,this.y0=this.utmSouth?1E7:0,this.k0=0.9996,Proj4js.Proj.tmerc.init.apply(this),this.forward=Proj4js.Proj.tmerc.forward,this.inverse=Proj4js.Proj.tmerc.inverse):Proj4js.reportError("utm:init: zone must be specified for UTM")}};
Proj4js.Proj.eqdc={init:function(){this.mode||(this.mode=0);this.temp=this.b/this.a;this.es=1-Math.pow(this.temp,2);this.e=Math.sqrt(this.es);this.e0=Proj4js.common.e0fn(this.es);this.e1=Proj4js.common.e1fn(this.es);this.e2=Proj4js.common.e2fn(this.es);this.e3=Proj4js.common.e3fn(this.es);this.sinphi=Math.sin(this.lat1);this.cosphi=Math.cos(this.lat1);this.ms1=Proj4js.common.msfnz(this.e,this.sinphi,this.cosphi);this.ml1=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat1);0!=this.mode?
(Math.abs(this.lat1+this.lat2)<Proj4js.common.EPSLN&&Proj4js.reportError("eqdc:Init:EqualLatitudes"),this.sinphi=Math.sin(this.lat2),this.cosphi=Math.cos(this.lat2),this.ms2=Proj4js.common.msfnz(this.e,this.sinphi,this.cosphi),this.ml2=Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat2),this.ns=Math.abs(this.lat1-this.lat2)>=Proj4js.common.EPSLN?(this.ms1-this.ms2)/(this.ml2-this.ml1):this.sinphi):this.ns=this.sinphi;this.g=this.ml1+this.ms1/this.ns;this.ml0=Proj4js.common.mlfn(this.e0,
this.e1,this.e2,this.e3,this.lat0);this.rh=this.a*(this.g-this.ml0)},forward:function(a){var c=a.x,b=this.a*(this.g-Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,a.y)),d=this.ns*Proj4js.common.adjust_lon(c-this.long0),c=this.x0+b*Math.sin(d),b=this.y0+this.rh-b*Math.cos(d);a.x=c;a.y=b;return a},inverse:function(a){a.x-=this.x0;a.y=this.rh-a.y+this.y0;var c,b;0<=this.ns?(b=Math.sqrt(a.x*a.x+a.y*a.y),c=1):(b=-Math.sqrt(a.x*a.x+a.y*a.y),c=-1);var d=0;0!=b&&(d=Math.atan2(c*a.x,c*a.y));c=this.phi3z(this.g-
b/this.a,this.e0,this.e1,this.e2,this.e3);d=Proj4js.common.adjust_lon(this.long0+d/this.ns);a.x=d;a.y=c;return a},phi3z:function(a,c,b,d,e){var f,g;f=a;for(var i=0;15>i;i++)if(g=(a+b*Math.sin(2*f)-d*Math.sin(4*f)+e*Math.sin(6*f))/c-f,f+=g,1.0E-10>=Math.abs(g))return f;Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations");return null}};
Proj4js.Proj.tmerc={init:function(){this.e0=Proj4js.common.e0fn(this.es);this.e1=Proj4js.common.e1fn(this.es);this.e2=Proj4js.common.e2fn(this.es);this.e3=Proj4js.common.e3fn(this.es);this.ml0=this.a*Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat0)},forward:function(a){var c=a.y,b=Proj4js.common.adjust_lon(a.x-this.long0),d,e;d=Math.sin(c);var f=Math.cos(c);if(this.sphere){var g=f*Math.sin(b);if(1.0E-10>Math.abs(Math.abs(g)-1))return Proj4js.reportError("tmerc:forward: Point projects into infinity"),
93;e=0.5*this.a*this.k0*Math.log((1+g)/(1-g));d=Math.acos(f*Math.cos(b)/Math.sqrt(1-g*g));0>c&&(d=-d);c=this.a*this.k0*(d-this.lat0)}else{e=f*b;var b=Math.pow(e,2),f=this.ep2*Math.pow(f,2),g=Math.tan(c),i=Math.pow(g,2);d=1-this.es*Math.pow(d,2);d=this.a/Math.sqrt(d);c=this.a*Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,c);e=this.k0*d*e*(1+b/6*(1-i+f+b/20*(5-18*i+Math.pow(i,2)+72*f-58*this.ep2)))+this.x0;c=this.k0*(c-this.ml0+d*g*b*(0.5+b/24*(5-i+9*f+4*Math.pow(f,2)+b/30*(61-58*i+Math.pow(i,
2)+600*f-330*this.ep2))))+this.y0}a.x=e;a.y=c;return a},inverse:function(a){var c,b,d,e;if(this.sphere){b=Math.exp(a.x/(this.a*this.k0));var f=0.5*(b-1/b);d=this.lat0+a.y/(this.a*this.k0);e=Math.cos(d);c=Math.sqrt((1-e*e)/(1+f*f));b=Proj4js.common.asinz(c);0>d&&(b=-b);c=0==f&&0==e?this.long0:Proj4js.common.adjust_lon(Math.atan2(f,e)+this.long0)}else{var f=a.x-this.x0,g=a.y-this.y0;b=c=(this.ml0+g/this.k0)/this.a;for(e=0;;e++){d=(c+this.e1*Math.sin(2*b)-this.e2*Math.sin(4*b)+this.e3*Math.sin(6*b))/
this.e0-b;b+=d;if(Math.abs(d)<=Proj4js.common.EPSLN)break;if(6<=e)return Proj4js.reportError("tmerc:inverse: Latitude failed to converge"),95}if(Math.abs(b)<Proj4js.common.HALF_PI){c=Math.sin(b);d=Math.cos(b);var i=Math.tan(b);e=this.ep2*Math.pow(d,2);var g=Math.pow(e,2),h=Math.pow(i,2),j=Math.pow(h,2);c=1-this.es*Math.pow(c,2);var k=this.a/Math.sqrt(c);c=k*(1-this.es)/c;var f=f/(k*this.k0),l=Math.pow(f,2);b-=k*i*l/c*(0.5-l/24*(5+3*h+10*e-4*g-9*this.ep2-l/30*(61+90*h+298*e+45*j-252*this.ep2-3*g)));
c=Proj4js.common.adjust_lon(this.long0+f*(1-l/6*(1+2*h+e-l/20*(5-2*e+28*h-3*g+8*this.ep2+24*j)))/d)}else b=Proj4js.common.HALF_PI*Proj4js.common.sign(g),c=this.long0}a.x=c;a.y=b;return a}};Proj4js.defs.GOOGLE="+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs";Proj4js.defs["EPSG:900913"]=Proj4js.defs.GOOGLE;
Proj4js.Proj.gstmerc={init:function(){var a=this.b/this.a;this.e=Math.sqrt(1-a*a);this.lc=this.long0;this.rs=Math.sqrt(1+this.e*this.e*Math.pow(Math.cos(this.lat0),4)/(1-this.e*this.e));var a=Math.sin(this.lat0),c=Math.asin(a/this.rs),b=Math.sin(c);this.cp=Proj4js.common.latiso(0,c,b)-this.rs*Proj4js.common.latiso(this.e,this.lat0,a);this.n2=this.k0*this.a*Math.sqrt(1-this.e*this.e)/(1-this.e*this.e*a*a);this.xs=this.x0;this.ys=this.y0-this.n2*c;this.title||(this.title="Gauss Schreiber transverse mercator")},
forward:function(a){var c=a.y,b=this.rs*(a.x-this.lc),c=this.cp+this.rs*Proj4js.common.latiso(this.e,c,Math.sin(c)),d=Math.asin(Math.sin(b)/Proj4js.common.cosh(c)),d=Proj4js.common.latiso(0,d,Math.sin(d));a.x=this.xs+this.n2*d;a.y=this.ys+this.n2*Math.atan(Proj4js.common.sinh(c)/Math.cos(b));return a},inverse:function(a){var c=a.x,b=a.y,d=Math.atan(Proj4js.common.sinh((c-this.xs)/this.n2)/Math.cos((b-this.ys)/this.n2)),c=Math.asin(Math.sin((b-this.ys)/this.n2)/Proj4js.common.cosh((c-this.xs)/this.n2)),
c=Proj4js.common.latiso(0,c,Math.sin(c));a.x=this.lc+d/this.rs;a.y=Proj4js.common.invlatiso(this.e,(c-this.cp)/this.rs);return a}};
Proj4js.Proj.ortho={init:function(){this.sin_p14=Math.sin(this.lat0);this.cos_p14=Math.cos(this.lat0)},forward:function(a){var c,b,d,e,f;b=a.y;d=Proj4js.common.adjust_lon(a.x-this.long0);c=Math.sin(b);b=Math.cos(b);e=Math.cos(d);f=this.sin_p14*c+this.cos_p14*b*e;if(0<f||Math.abs(f)<=Proj4js.common.EPSLN)var g=1*this.a*b*Math.sin(d),i=this.y0+1*this.a*(this.cos_p14*c-this.sin_p14*b*e);else Proj4js.reportError("orthoFwdPointError");a.x=g;a.y=i;return a},inverse:function(a){var c,b,d,e;a.x-=this.x0;
a.y-=this.y0;c=Math.sqrt(a.x*a.x+a.y*a.y);c>this.a+1.0E-7&&Proj4js.reportError("orthoInvDataError");b=Proj4js.common.asinz(c/this.a);d=Math.sin(b);e=Math.cos(b);b=this.long0;Math.abs(c);d=Proj4js.common.asinz(e*this.sin_p14+a.y*d*this.cos_p14/c);c=Math.abs(this.lat0)-Proj4js.common.HALF_PI;Math.abs(c)<=Proj4js.common.EPSLN&&(b=0<=this.lat0?Proj4js.common.adjust_lon(this.long0+Math.atan2(a.x,-a.y)):Proj4js.common.adjust_lon(this.long0-Math.atan2(-a.x,a.y)));Math.sin(d);a.x=b;a.y=d;return a}};
Proj4js.Proj.krovak={init:function(){this.a=6377397.155;this.es=0.006674372230614;this.e=Math.sqrt(this.es);this.lat0||(this.lat0=0.863937979737193);this.long0||(this.long0=0.4334234309119251);this.k0||(this.k0=0.9999);this.s45=0.785398163397448;this.s90=2*this.s45;this.fi0=this.lat0;this.e2=this.es;this.e=Math.sqrt(this.e2);this.alfa=Math.sqrt(1+this.e2*Math.pow(Math.cos(this.fi0),4)/(1-this.e2));this.uq=1.04216856380474;this.u0=Math.asin(Math.sin(this.fi0)/this.alfa);this.g=Math.pow((1+this.e*Math.sin(this.fi0))/
(1-this.e*Math.sin(this.fi0)),this.alfa*this.e/2);this.k=Math.tan(this.u0/2+this.s45)/Math.pow(Math.tan(this.fi0/2+this.s45),this.alfa)*this.g;this.k1=this.k0;this.n0=this.a*Math.sqrt(1-this.e2)/(1-this.e2*Math.pow(Math.sin(this.fi0),2));this.s0=1.37008346281555;this.n=Math.sin(this.s0);this.ro0=this.k1*this.n0/Math.tan(this.s0);this.ad=this.s90-this.uq},forward:function(a){var c,b,d;b=a.y;d=Proj4js.common.adjust_lon(a.x-this.long0);c=Math.pow((1+this.e*Math.sin(b))/(1-this.e*Math.sin(b)),this.alfa*
this.e/2);c=2*(Math.atan(this.k*Math.pow(Math.tan(b/2+this.s45),this.alfa)/c)-this.s45);b=-d*this.alfa;d=Math.asin(Math.cos(this.ad)*Math.sin(c)+Math.sin(this.ad)*Math.cos(c)*Math.cos(b));c=this.n*Math.asin(Math.cos(c)*Math.sin(b)/Math.cos(d));d=this.ro0*Math.pow(Math.tan(this.s0/2+this.s45),this.n)/Math.pow(Math.tan(d/2+this.s45),this.n);a.y=d*Math.cos(c)/1;a.x=d*Math.sin(c)/1;this.czech&&(a.y*=-1,a.x*=-1);return a},inverse:function(a){var c,b,d;c=a.x;a.x=a.y;a.y=c;this.czech&&(a.y*=-1,a.x*=-1);
c=Math.sqrt(a.x*a.x+a.y*a.y);b=Math.atan2(a.y,a.x)/Math.sin(this.s0);d=2*(Math.atan(Math.pow(this.ro0/c,1/this.n)*Math.tan(this.s0/2+this.s45))-this.s45);c=Math.asin(Math.cos(this.ad)*Math.sin(d)-Math.sin(this.ad)*Math.cos(d)*Math.cos(b));b=Math.asin(Math.cos(d)*Math.sin(b)/Math.cos(c));a.x=this.long0-b/this.alfa;b=c;var e=d=0;do a.y=2*(Math.atan(Math.pow(this.k,-1/this.alfa)*Math.pow(Math.tan(c/2+this.s45),1/this.alfa)*Math.pow((1+this.e*Math.sin(b))/(1-this.e*Math.sin(b)),this.e/2))-this.s45),1.0E-10>
Math.abs(b-a.y)&&(d=1),b=a.y,e+=1;while(0==d&&15>e);return 15<=e?(Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations"),null):a}};
Proj4js.Proj.somerc={init:function(){var a=this.lat0;this.lambda0=this.long0;var c=Math.sin(a),b=this.a,d=1/this.rf,d=2*d-Math.pow(d,2),e=this.e=Math.sqrt(d);this.R=this.k0*b*Math.sqrt(1-d)/(1-d*Math.pow(c,2));this.alpha=Math.sqrt(1+d/(1-d)*Math.pow(Math.cos(a),4));this.b0=Math.asin(c/this.alpha);this.K=Math.log(Math.tan(Math.PI/4+this.b0/2))-this.alpha*Math.log(Math.tan(Math.PI/4+a/2))+this.alpha*e/2*Math.log((1+e*c)/(1-e*c))},forward:function(a){var c=Math.log(Math.tan(Math.PI/4-a.y/2)),b=this.e/
2*Math.log((1+this.e*Math.sin(a.y))/(1-this.e*Math.sin(a.y))),b=2*(Math.atan(Math.exp(-this.alpha*(c+b)+this.K))-Math.PI/4),d=this.alpha*(a.x-this.lambda0),c=Math.atan(Math.sin(d)/(Math.sin(this.b0)*Math.tan(b)+Math.cos(this.b0)*Math.cos(d))),b=Math.asin(Math.cos(this.b0)*Math.sin(b)-Math.sin(this.b0)*Math.cos(b)*Math.cos(d));a.y=this.R/2*Math.log((1+Math.sin(b))/(1-Math.sin(b)))+this.y0;a.x=this.R*c+this.x0;return a},inverse:function(a){for(var c=(a.x-this.x0)/this.R,b=2*(Math.atan(Math.exp((a.y-
this.y0)/this.R))-Math.PI/4),d=Math.asin(Math.cos(this.b0)*Math.sin(b)+Math.sin(this.b0)*Math.cos(b)*Math.cos(c)),c=this.lambda0+Math.atan(Math.sin(c)/(Math.cos(this.b0)*Math.cos(c)-Math.sin(this.b0)*Math.tan(b)))/this.alpha,b=0,e=d,f=-1E3,g=0;1.0E-7<Math.abs(e-f);){if(20<++g){Proj4js.reportError("omercFwdInfinity");return}b=1/this.alpha*(Math.log(Math.tan(Math.PI/4+d/2))-this.K)+this.e*Math.log(Math.tan(Math.PI/4+Math.asin(this.e*Math.sin(e))/2));f=e;e=2*Math.atan(Math.exp(b))-Math.PI/2}a.x=c;a.y=
e;return a}};
Proj4js.Proj.stere={ssfn_:function(a,c,b){c*=b;return Math.tan(0.5*(Proj4js.common.HALF_PI+a))*Math.pow((1-c)/(1+c),0.5*b)},TOL:1.0E-8,NITER:8,CONV:1.0E-10,S_POLE:0,N_POLE:1,OBLIQ:2,EQUIT:3,init:function(){this.phits=this.lat_ts?this.lat_ts:Proj4js.common.HALF_PI;var a=Math.abs(this.lat0);this.mode=Math.abs(a)-Proj4js.common.HALF_PI<Proj4js.common.EPSLN?0>this.lat0?this.S_POLE:this.N_POLE:a>Proj4js.common.EPSLN?this.OBLIQ:this.EQUIT;this.phits=Math.abs(this.phits);if(this.es){var c;switch(this.mode){case this.N_POLE:case this.S_POLE:Math.abs(this.phits-Proj4js.common.HALF_PI)<
Proj4js.common.EPSLN?this.akm1=2*this.k0/Math.sqrt(Math.pow(1+this.e,1+this.e)*Math.pow(1-this.e,1-this.e)):(a=Math.sin(this.phits),this.akm1=Math.cos(this.phits)/Proj4js.common.tsfnz(this.e,this.phits,a),a*=this.e,this.akm1/=Math.sqrt(1-a*a));break;case this.EQUIT:this.akm1=2*this.k0;break;case this.OBLIQ:a=Math.sin(this.lat0),c=2*Math.atan(this.ssfn_(this.lat0,a,this.e))-Proj4js.common.HALF_PI,a*=this.e,this.akm1=2*this.k0*Math.cos(this.lat0)/Math.sqrt(1-a*a),this.sinX1=Math.sin(c),this.cosX1=Math.cos(c)}}else switch(this.mode){case this.OBLIQ:this.sinph0=
Math.sin(this.lat0),this.cosph0=Math.cos(this.lat0);case this.EQUIT:this.akm1=2*this.k0;break;case this.S_POLE:case this.N_POLE:this.akm1=Math.abs(this.phits-Proj4js.common.HALF_PI)>=Proj4js.common.EPSLN?Math.cos(this.phits)/Math.tan(Proj4js.common.FORTPI-0.5*this.phits):2*this.k0}},forward:function(a){var c=a.x,c=Proj4js.common.adjust_lon(c-this.long0),b=a.y,d,e;if(this.sphere){var f,g,i;f=Math.sin(b);g=Math.cos(b);i=Math.cos(c);c=Math.sin(c);switch(this.mode){case this.EQUIT:e=1+g*i;e<=Proj4js.common.EPSLN&&
Proj4js.reportError("stere:forward:Equit");e=this.akm1/e;d=e*g*c;e*=f;break;case this.OBLIQ:e=1+this.sinph0*f+this.cosph0*g*i;e<=Proj4js.common.EPSLN&&Proj4js.reportError("stere:forward:Obliq");e=this.akm1/e;d=e*g*c;e*=this.cosph0*f-this.sinph0*g*i;break;case this.N_POLE:i=-i,b=-b;case this.S_POLE:Math.abs(b-Proj4js.common.HALF_PI)<this.TOL&&Proj4js.reportError("stere:forward:S_POLE"),e=this.akm1*Math.tan(Proj4js.common.FORTPI+0.5*b),d=c*e,e*=i}}else{i=Math.cos(c);c=Math.sin(c);f=Math.sin(b);var h;
if(this.mode==this.OBLIQ||this.mode==this.EQUIT)h=2*Math.atan(this.ssfn_(b,f,this.e)),g=Math.sin(h-Proj4js.common.HALF_PI),h=Math.cos(h);switch(this.mode){case this.OBLIQ:b=this.akm1/(this.cosX1*(1+this.sinX1*g+this.cosX1*h*i));e=b*(this.cosX1*g-this.sinX1*h*i);d=b*h;break;case this.EQUIT:b=2*this.akm1/(1+h*i);e=b*g;d=b*h;break;case this.S_POLE:b=-b,i=-i,f=-f;case this.N_POLE:d=this.akm1*Proj4js.common.tsfnz(this.e,b,f),e=-d*i}d*=c}a.x=d*this.a+this.x0;a.y=e*this.a+this.y0;return a},inverse:function(a){var c=
(a.x-this.x0)/this.a,b=(a.y-this.y0)/this.a,d,e,f,g=d=0,i,h=f=0;if(this.sphere){g=Math.sqrt(c*c+b*b);h=2*Math.atan(g/this.akm1);f=Math.sin(h);h=Math.cos(h);d=0;switch(this.mode){case this.EQUIT:e=Math.abs(g)<=Proj4js.common.EPSLN?0:Math.asin(b*f/g);if(0!=h||0!=c)d=Math.atan2(c*f,h*g);break;case this.OBLIQ:e=Math.abs(g)<=Proj4js.common.EPSLN?this.phi0:Math.asin(h*this.sinph0+b*f*this.cosph0/g);h-=this.sinph0*Math.sin(e);if(0!=h||0!=c)d=Math.atan2(c*f*this.cosph0,h*g);break;case this.N_POLE:b=-b;case this.S_POLE:e=
Math.abs(g)<=Proj4js.common.EPSLN?this.phi0:Math.asin(this.mode==this.S_POLE?-h:h),d=0==c&&0==b?0:Math.atan2(c,b)}a.x=Proj4js.common.adjust_lon(d+this.long0);a.y=e}else{i=Math.sqrt(c*c+b*b);switch(this.mode){case this.OBLIQ:case this.EQUIT:d=2*Math.atan2(i*this.cosX1,this.akm1);f=Math.cos(d);e=Math.sin(d);g=0==i?Math.asin(f*this.sinX1):Math.asin(f*this.sinX1+b*e*this.cosX1/i);d=Math.tan(0.5*(Proj4js.common.HALF_PI+g));c*=e;b=i*this.cosX1*f-b*this.sinX1*e;h=Proj4js.common.HALF_PI;f=0.5*this.e;break;
case this.N_POLE:b=-b;case this.S_POLE:d=-i/this.akm1,g=Proj4js.common.HALF_PI-2*Math.atan(d),h=-Proj4js.common.HALF_PI,f=-0.5*this.e}for(i=this.NITER;i--;g=e)if(e=this.e*Math.sin(g),e=2*Math.atan(d*Math.pow((1+e)/(1-e),f))-h,Math.abs(g-e)<this.CONV)return this.mode==this.S_POLE&&(e=-e),d=0==c&&0==b?0:Math.atan2(c,b),a.x=Proj4js.common.adjust_lon(d+this.long0),a.y=e,a}}};
Proj4js.Proj.nzmg={iterations:1,init:function(){this.A=[];this.A[1]=0.6399175073;this.A[2]=-0.1358797613;this.A[3]=0.063294409;this.A[4]=-0.02526853;this.A[5]=0.0117879;this.A[6]=-0.0055161;this.A[7]=0.0026906;this.A[8]=-0.001333;this.A[9]=6.7E-4;this.A[10]=-3.4E-4;this.B_re=[];this.B_im=[];this.B_re[1]=0.7557853228;this.B_im[1]=0;this.B_re[2]=0.249204646;this.B_im[2]=0.003371507;this.B_re[3]=-0.001541739;this.B_im[3]=0.04105856;this.B_re[4]=-0.10162907;this.B_im[4]=0.01727609;this.B_re[5]=-0.26623489;
this.B_im[5]=-0.36249218;this.B_re[6]=-0.6870983;this.B_im[6]=-1.1651967;this.C_re=[];this.C_im=[];this.C_re[1]=1.3231270439;this.C_im[1]=0;this.C_re[2]=-0.577245789;this.C_im[2]=-0.007809598;this.C_re[3]=0.508307513;this.C_im[3]=-0.112208952;this.C_re[4]=-0.15094762;this.C_im[4]=0.18200602;this.C_re[5]=1.01418179;this.C_im[5]=1.64497696;this.C_re[6]=1.9660549;this.C_im[6]=2.5127645;this.D=[];this.D[1]=1.5627014243;this.D[2]=0.5185406398;this.D[3]=-0.03333098;this.D[4]=-0.1052906;this.D[5]=-0.0368594;
this.D[6]=0.007317;this.D[7]=0.0122;this.D[8]=0.00394;this.D[9]=-0.0013},forward:function(a){for(var c=1.0E-5*((a.y-this.lat0)/Proj4js.common.SEC_TO_RAD),b=a.x-this.long0,d=1,e=0,f=1;10>=f;f++)d*=c,e+=this.A[f]*d;for(var c=e,d=1,g=0,i=0,h=0,f=1;6>=f;f++)e=d*c-g*b,g=g*c+d*b,d=e,i=i+this.B_re[f]*d-this.B_im[f]*g,h=h+this.B_im[f]*d+this.B_re[f]*g;a.x=h*this.a+this.x0;a.y=i*this.a+this.y0;return a},inverse:function(a){for(var c=(a.y-this.y0)/this.a,b=(a.x-this.x0)/this.a,d=1,e=0,f,g=0,i=0,h=1;6>=h;h++)f=
d*c-e*b,e=e*c+d*b,d=f,g=g+this.C_re[h]*d-this.C_im[h]*e,i=i+this.C_im[h]*d+this.C_re[h]*e;for(d=0;d<this.iterations;d++){var j=g,k=i,l;f=c;e=b;for(h=2;6>=h;h++)l=j*g-k*i,k=k*g+j*i,j=l,f+=(h-1)*(this.B_re[h]*j-this.B_im[h]*k),e+=(h-1)*(this.B_im[h]*j+this.B_re[h]*k);for(var j=1,k=0,m=this.B_re[1],n=this.B_im[1],h=2;6>=h;h++)l=j*g-k*i,k=k*g+j*i,j=l,m+=h*(this.B_re[h]*j-this.B_im[h]*k),n+=h*(this.B_im[h]*j+this.B_re[h]*k);i=m*m+n*n;g=(f*m+e*n)/i;i=(e*m-f*n)/i}c=g;b=1;g=0;for(h=1;9>=h;h++)b*=c,g+=this.D[h]*
b;h=this.lat0+1E5*g*Proj4js.common.SEC_TO_RAD;a.x=this.long0+i;a.y=h;return a}};Proj4js.Proj.mill={init:function(){},forward:function(a){var c=a.y,b=this.x0+this.a*Proj4js.common.adjust_lon(a.x-this.long0),c=this.y0+1.25*this.a*Math.log(Math.tan(Proj4js.common.PI/4+c/2.5));a.x=b;a.y=c;return a},inverse:function(a){a.x-=this.x0;a.y-=this.y0;var c=Proj4js.common.adjust_lon(this.long0+a.x/this.a),b=2.5*(Math.atan(Math.exp(0.8*a.y/this.a))-Proj4js.common.PI/4);a.x=c;a.y=b;return a}};
Proj4js.Proj.gnom={init:function(){this.sin_p14=Math.sin(this.lat0);this.cos_p14=Math.cos(this.lat0);this.infinity_dist=1E3*this.a;this.rc=1},forward:function(a){var c,b,d,e,f;b=a.y;d=Proj4js.common.adjust_lon(a.x-this.long0);c=Math.sin(b);b=Math.cos(b);e=Math.cos(d);f=this.sin_p14*c+this.cos_p14*b*e;0<f||Math.abs(f)<=Proj4js.common.EPSLN?(d=this.x0+1*this.a*b*Math.sin(d)/f,c=this.y0+1*this.a*(this.cos_p14*c-this.sin_p14*b*e)/f):(Proj4js.reportError("orthoFwdPointError"),d=this.x0+this.infinity_dist*
b*Math.sin(d),c=this.y0+this.infinity_dist*(this.cos_p14*c-this.sin_p14*b*e));a.x=d;a.y=c;return a},inverse:function(a){var c,b,d,e;a.x=(a.x-this.x0)/this.a;a.y=(a.y-this.y0)/this.a;a.x/=this.k0;a.y/=this.k0;(c=Math.sqrt(a.x*a.x+a.y*a.y))?(e=Math.atan2(c,this.rc),b=Math.sin(e),d=Math.cos(e),e=Proj4js.common.asinz(d*this.sin_p14+a.y*b*this.cos_p14/c),c=Math.atan2(a.x*b,c*this.cos_p14*d-a.y*this.sin_p14*b),c=Proj4js.common.adjust_lon(this.long0+c)):(e=this.phic0,c=0);a.x=c;a.y=e;return a}};
Proj4js.Proj.sinu={init:function(){this.sphere?(this.n=1,this.es=this.m=0,this.C_y=Math.sqrt((this.m+1)/this.n),this.C_x=this.C_y/(this.m+1)):this.en=Proj4js.common.pj_enfn(this.es)},forward:function(a){var c,b;c=a.x;b=a.y;c=Proj4js.common.adjust_lon(c-this.long0);if(this.sphere){if(this.m)for(var d=this.n*Math.sin(b),e=Proj4js.common.MAX_ITER;e;--e){var f=(this.m*b+Math.sin(b)-d)/(this.m+Math.cos(b));b-=f;if(Math.abs(f)<Proj4js.common.EPSLN)break}else b=1!=this.n?Math.asin(this.n*Math.sin(b)):b;
c=this.a*this.C_x*c*(this.m+Math.cos(b));b*=this.a*this.C_y}else d=Math.sin(b),e=Math.cos(b),b=this.a*Proj4js.common.pj_mlfn(b,d,e,this.en),c=this.a*c*e/Math.sqrt(1-this.es*d*d);a.x=c;a.y=b;return a},inverse:function(a){var c,b;a.x-=this.x0;a.y-=this.y0;if(this.sphere)a.y/=this.C_y,c=this.m?Math.asin((this.m*a.y+Math.sin(a.y))/this.n):1!=this.n?Math.asin(Math.sin(a.y)/this.n):a.y,b=a.x/(this.C_x*(this.m+Math.cos(a.y)));else{c=Proj4js.common.pj_inv_mlfn(a.y/this.a,this.es,this.en);var d=Math.abs(c);
d<Proj4js.common.HALF_PI?(d=Math.sin(c),b=this.long0+a.x*Math.sqrt(1-this.es*d*d)/(this.a*Math.cos(c)),b=Proj4js.common.adjust_lon(b)):d-Proj4js.common.EPSLN<Proj4js.common.HALF_PI&&(b=this.long0)}a.x=b;a.y=c;return a}};
Proj4js.Proj.vandg={init:function(){this.R=6370997},forward:function(a){var c=a.y,b=Proj4js.common.adjust_lon(a.x-this.long0);Math.abs(c);var d=Proj4js.common.asinz(2*Math.abs(c/Proj4js.common.PI));(Math.abs(b)<=Proj4js.common.EPSLN||Math.abs(Math.abs(c)-Proj4js.common.HALF_PI)<=Proj4js.common.EPSLN)&&Math.tan(0.5*d);var e=0.5*Math.abs(Proj4js.common.PI/b-b/Proj4js.common.PI),f=e*e,g=Math.sin(d),d=Math.cos(d),d=d/(g+d-1),g=d*(2/g-1),g=g*g,f=Proj4js.common.PI*this.R*(e*(d-g)+Math.sqrt(f*(d-g)*(d-g)-
(g+f)*(d*d-g)))/(g+f);0>b&&(f=-f);b=this.x0+f;f=Math.abs(f/(Proj4js.common.PI*this.R));c=0<=c?this.y0+Proj4js.common.PI*this.R*Math.sqrt(1-f*f-2*e*f):this.y0-Proj4js.common.PI*this.R*Math.sqrt(1-f*f-2*e*f);a.x=b;a.y=c;return a},inverse:function(a){var c,b,d,e,f,g,i,h;a.x-=this.x0;a.y-=this.y0;h=Proj4js.common.PI*this.R;c=a.x/h;d=a.y/h;e=c*c+d*d;f=-Math.abs(d)*(1+e);b=f-2*d*d+c*c;g=-2*f+1+2*d*d+e*e;h=d*d/g+(2*b*b*b/g/g/g-9*f*b/g/g)/27;i=(f-b*b/3/g)/g;f=2*Math.sqrt(-i/3);h=3*h/i/f;1<Math.abs(h)&&(h=
0<=h?1:-1);h=Math.acos(h)/3;b=0<=a.y?(-f*Math.cos(h+Proj4js.common.PI/3)-b/3/g)*Proj4js.common.PI:-(-f*Math.cos(h+Proj4js.common.PI/3)-b/3/g)*Proj4js.common.PI;Math.abs(c);c=Proj4js.common.adjust_lon(this.long0+Proj4js.common.PI*(e-1+Math.sqrt(1+2*(c*c-d*d)+e*e))/2/c);a.x=c;a.y=b;return a}};
Proj4js.Proj.cea={init:function(){},forward:function(a){var c=a.y,b=this.x0+this.a*Proj4js.common.adjust_lon(a.x-this.long0)*Math.cos(this.lat_ts),c=this.y0+this.a*Math.sin(c)/Math.cos(this.lat_ts);a.x=b;a.y=c;return a},inverse:function(a){a.x-=this.x0;a.y-=this.y0;var c=Proj4js.common.adjust_lon(this.long0+a.x/this.a/Math.cos(this.lat_ts)),b=Math.asin(a.y/this.a*Math.cos(this.lat_ts));a.x=c;a.y=b;return a}};
Proj4js.Proj.eqc={init:function(){this.x0||(this.x0=0);this.y0||(this.y0=0);this.lat0||(this.lat0=0);this.long0||(this.long0=0);this.lat_ts||(this.lat_ts=0);this.title||(this.title="Equidistant Cylindrical (Plate Carre)");this.rc=Math.cos(this.lat_ts)},forward:function(a){var c=a.y,b=Proj4js.common.adjust_lon(a.x-this.long0),c=Proj4js.common.adjust_lat(c-this.lat0);a.x=this.x0+this.a*b*this.rc;a.y=this.y0+this.a*c;return a},inverse:function(a){var c=a.y;a.x=Proj4js.common.adjust_lon(this.long0+(a.x-
this.x0)/(this.a*this.rc));a.y=Proj4js.common.adjust_lat(this.lat0+(c-this.y0)/this.a);return a}};
Proj4js.Proj.cass={init:function(){this.sphere||(this.en=Proj4js.common.pj_enfn(this.es),this.m0=Proj4js.common.pj_mlfn(this.lat0,Math.sin(this.lat0),Math.cos(this.lat0),this.en))},C1:0.16666666666666666,C2:0.008333333333333333,C3:0.041666666666666664,C4:0.3333333333333333,C5:0.06666666666666667,forward:function(a){var c,b,d=a.x,e=a.y,d=Proj4js.common.adjust_lon(d-this.long0);this.sphere?(c=Math.asin(Math.cos(e)*Math.sin(d)),b=Math.atan2(Math.tan(e),Math.cos(d))-this.phi0):(this.n=Math.sin(e),this.c=
Math.cos(e),b=Proj4js.common.pj_mlfn(e,this.n,this.c,this.en),this.n=1/Math.sqrt(1-this.es*this.n*this.n),this.tn=Math.tan(e),this.t=this.tn*this.tn,this.a1=d*this.c,this.c*=this.es*this.c/(1-this.es),this.a2=this.a1*this.a1,c=this.n*this.a1*(1-this.a2*this.t*(this.C1-(8-this.t+8*this.c)*this.a2*this.C2)),b-=this.m0-this.n*this.tn*this.a2*(0.5+(5-this.t+6*this.c)*this.a2*this.C3));a.x=this.a*c+this.x0;a.y=this.a*b+this.y0;return a},inverse:function(a){a.x-=this.x0;a.y-=this.y0;var c=a.x/this.a,b=
a.y/this.a;if(this.sphere)this.dd=b+this.lat0,b=Math.asin(Math.sin(this.dd)*Math.cos(c)),c=Math.atan2(Math.tan(c),Math.cos(this.dd));else{var d=Proj4js.common.pj_inv_mlfn(this.m0+b,this.es,this.en);this.tn=Math.tan(d);this.t=this.tn*this.tn;this.n=Math.sin(d);this.r=1/(1-this.es*this.n*this.n);this.n=Math.sqrt(this.r);this.r*=(1-this.es)*this.n;this.dd=c/this.n;this.d2=this.dd*this.dd;b=d-this.n*this.tn/this.r*this.d2*(0.5-(1+3*this.t)*this.d2*this.C3);c=this.dd*(1+this.t*this.d2*(-this.C4+(1+3*this.t)*
this.d2*this.C5))/Math.cos(d)}a.x=Proj4js.common.adjust_lon(this.long0+c);a.y=b;return a}};
Proj4js.Proj.gauss={init:function(){var a=Math.sin(this.lat0),c=Math.cos(this.lat0),c=c*c;this.rc=Math.sqrt(1-this.es)/(1-this.es*a*a);this.C=Math.sqrt(1+this.es*c*c/(1-this.es));this.phic0=Math.asin(a/this.C);this.ratexp=0.5*this.C*this.e;this.K=Math.tan(0.5*this.phic0+Proj4js.common.FORTPI)/(Math.pow(Math.tan(0.5*this.lat0+Proj4js.common.FORTPI),this.C)*Proj4js.common.srat(this.e*a,this.ratexp))},forward:function(a){var c=a.x,b=a.y;a.y=2*Math.atan(this.K*Math.pow(Math.tan(0.5*b+Proj4js.common.FORTPI),
this.C)*Proj4js.common.srat(this.e*Math.sin(b),this.ratexp))-Proj4js.common.HALF_PI;a.x=this.C*c;return a},inverse:function(a){for(var c=a.x/this.C,b=a.y,d=Math.pow(Math.tan(0.5*b+Proj4js.common.FORTPI)/this.K,1/this.C),e=Proj4js.common.MAX_ITER;0<e;--e){b=2*Math.atan(d*Proj4js.common.srat(this.e*Math.sin(a.y),-0.5*this.e))-Proj4js.common.HALF_PI;if(1.0E-14>Math.abs(b-a.y))break;a.y=b}if(!e)return Proj4js.reportError("gauss:inverse:convergence failed"),null;a.x=c;a.y=b;return a}};
Proj4js.Proj.omerc={init:function(){this.mode||(this.mode=0);this.lon1||(this.lon1=0,this.mode=1);this.lon2||(this.lon2=0);this.lat2||(this.lat2=0);var a=1-Math.pow(this.b/this.a,2);Math.sqrt(a);this.sin_p20=Math.sin(this.lat0);this.cos_p20=Math.cos(this.lat0);this.con=1-this.es*this.sin_p20*this.sin_p20;this.com=Math.sqrt(1-a);this.bl=Math.sqrt(1+this.es*Math.pow(this.cos_p20,4)/(1-a));this.al=this.a*this.bl*this.k0*this.com/this.con;Math.abs(this.lat0)<Proj4js.common.EPSLN?this.el=this.d=this.ts=
1:(this.ts=Proj4js.common.tsfnz(this.e,this.lat0,this.sin_p20),this.con=Math.sqrt(this.con),this.d=this.bl*this.com/(this.cos_p20*this.con),this.f=0<this.d*this.d-1?0<=this.lat0?this.d+Math.sqrt(this.d*this.d-1):this.d-Math.sqrt(this.d*this.d-1):this.d,this.el=this.f*Math.pow(this.ts,this.bl));0!=this.mode?(this.g=0.5*(this.f-1/this.f),this.gama=Proj4js.common.asinz(Math.sin(this.alpha)/this.d),this.longc-=Proj4js.common.asinz(this.g*Math.tan(this.gama))/this.bl,this.con=Math.abs(this.lat0),this.con>
Proj4js.common.EPSLN&&Math.abs(this.con-Proj4js.common.HALF_PI)>Proj4js.common.EPSLN?(this.singam=Math.sin(this.gama),this.cosgam=Math.cos(this.gama),this.sinaz=Math.sin(this.alpha),this.cosaz=Math.cos(this.alpha),this.u=0<=this.lat0?this.al/this.bl*Math.atan(Math.sqrt(this.d*this.d-1)/this.cosaz):-(this.al/this.bl)*Math.atan(Math.sqrt(this.d*this.d-1)/this.cosaz)):Proj4js.reportError("omerc:Init:DataError")):(this.sinphi=Math.sin(this.at1),this.ts1=Proj4js.common.tsfnz(this.e,this.lat1,this.sinphi),
this.sinphi=Math.sin(this.lat2),this.ts2=Proj4js.common.tsfnz(this.e,this.lat2,this.sinphi),this.h=Math.pow(this.ts1,this.bl),this.l=Math.pow(this.ts2,this.bl),this.f=this.el/this.h,this.g=0.5*(this.f-1/this.f),this.j=(this.el*this.el-this.l*this.h)/(this.el*this.el+this.l*this.h),this.p=(this.l-this.h)/(this.l+this.h),this.dlon=this.lon1-this.lon2,this.dlon<-Proj4js.common.PI&&(this.lon2-=2*Proj4js.common.PI),this.dlon>Proj4js.common.PI&&(this.lon2+=2*Proj4js.common.PI),this.dlon=this.lon1-this.lon2,
this.longc=0.5*(this.lon1+this.lon2)-Math.atan(this.j*Math.tan(0.5*this.bl*this.dlon)/this.p)/this.bl,this.dlon=Proj4js.common.adjust_lon(this.lon1-this.longc),this.gama=Math.atan(Math.sin(this.bl*this.dlon)/this.g),this.alpha=Proj4js.common.asinz(this.d*Math.sin(this.gama)),Math.abs(this.lat1-this.lat2)<=Proj4js.common.EPSLN?Proj4js.reportError("omercInitDataError"):this.con=Math.abs(this.lat1),this.con<=Proj4js.common.EPSLN||Math.abs(this.con-Proj4js.common.HALF_PI)<=Proj4js.common.EPSLN?Proj4js.reportError("omercInitDataError"):
Math.abs(Math.abs(this.lat0)-Proj4js.common.HALF_PI)<=Proj4js.common.EPSLN&&Proj4js.reportError("omercInitDataError"),this.singam=Math.sin(this.gam),this.cosgam=Math.cos(this.gam),this.sinaz=Math.sin(this.alpha),this.cosaz=Math.cos(this.alpha),this.u=0<=this.lat0?this.al/this.bl*Math.atan(Math.sqrt(this.d*this.d-1)/this.cosaz):-(this.al/this.bl)*Math.atan(Math.sqrt(this.d*this.d-1)/this.cosaz))},forward:function(a){var c,b,d,e,f;d=a.x;b=a.y;c=Math.sin(b);e=Proj4js.common.adjust_lon(d-this.longc);
d=Math.sin(this.bl*e);Math.abs(Math.abs(b)-Proj4js.common.HALF_PI)>Proj4js.common.EPSLN?(c=Proj4js.common.tsfnz(this.e,b,c),c=this.el/Math.pow(c,this.bl),f=0.5*(c-1/c),c=(f*this.singam-d*this.cosgam)/(0.5*(c+1/c)),b=Math.cos(this.bl*e),1.0E-7>Math.abs(b)?d=this.al*this.bl*e:(d=this.al*Math.atan((f*this.cosgam+d*this.singam)/b)/this.bl,0>b&&(d+=Proj4js.common.PI*this.al/this.bl))):(c=0<=b?this.singam:-this.singam,d=this.al*b/this.bl);Math.abs(Math.abs(c)-1)<=Proj4js.common.EPSLN&&Proj4js.reportError("omercFwdInfinity");
e=0.5*this.al*Math.log((1-c)/(1+c))/this.bl;d-=this.u;c=this.y0+d*this.cosaz-e*this.sinaz;a.x=this.x0+e*this.cosaz+d*this.sinaz;a.y=c;return a},inverse:function(a){var c,b,d,e;a.x-=this.x0;a.y-=this.y0;c=a.x*this.cosaz-a.y*this.sinaz;d=a.y*this.cosaz+a.x*this.sinaz;d+=this.u;b=Math.exp(-this.bl*c/this.al);c=0.5*(b-1/b);b=0.5*(b+1/b);d=Math.sin(this.bl*d/this.al);e=(d*this.cosgam+c*this.singam)/b;Math.abs(Math.abs(e)-1)<=Proj4js.common.EPSLN?(c=this.longc,e=0<=e?Proj4js.common.HALF_PI:-Proj4js.common.HALF_PI):
(b=1/this.bl,e=Math.pow(this.el/Math.sqrt((1+e)/(1-e)),b),e=Proj4js.common.phi2z(this.e,e),c=this.longc-Math.atan2(c*this.cosgam-d*this.singam,b)/this.bl,c=Proj4js.common.adjust_lon(c));a.x=c;a.y=e;return a}};
Proj4js.Proj.lcc={init:function(){this.lat2||(this.lat2=this.lat0);this.k0||(this.k0=1);if(Math.abs(this.lat1+this.lat2)<Proj4js.common.EPSLN)Proj4js.reportError("lcc:init: Equal Latitudes");else{var a=this.b/this.a;this.e=Math.sqrt(1-a*a);var a=Math.sin(this.lat1),c=Math.cos(this.lat1),c=Proj4js.common.msfnz(this.e,a,c),b=Proj4js.common.tsfnz(this.e,this.lat1,a),d=Math.sin(this.lat2),e=Math.cos(this.lat2),e=Proj4js.common.msfnz(this.e,d,e),d=Proj4js.common.tsfnz(this.e,this.lat2,d),f=Proj4js.common.tsfnz(this.e,
this.lat0,Math.sin(this.lat0));this.ns=Math.abs(this.lat1-this.lat2)>Proj4js.common.EPSLN?Math.log(c/e)/Math.log(b/d):a;this.f0=c/(this.ns*Math.pow(b,this.ns));this.rh=this.a*this.f0*Math.pow(f,this.ns);this.title||(this.title="Lambert Conformal Conic")}},forward:function(a){var c=a.x,b=a.y;if(!(90>=b&&-90<=b&&180>=c&&-180<=c))return Proj4js.reportError("lcc:forward: llInputOutOfRange: "+c+" : "+b),null;var d=Math.abs(Math.abs(b)-Proj4js.common.HALF_PI);if(d>Proj4js.common.EPSLN)b=Proj4js.common.tsfnz(this.e,
b,Math.sin(b)),b=this.a*this.f0*Math.pow(b,this.ns);else{d=b*this.ns;if(0>=d)return Proj4js.reportError("lcc:forward: No Projection"),null;b=0}c=this.ns*Proj4js.common.adjust_lon(c-this.long0);a.x=this.k0*b*Math.sin(c)+this.x0;a.y=this.k0*(this.rh-b*Math.cos(c))+this.y0;return a},inverse:function(a){var c,b,d,e=(a.x-this.x0)/this.k0,f=this.rh-(a.y-this.y0)/this.k0;0<this.ns?(c=Math.sqrt(e*e+f*f),b=1):(c=-Math.sqrt(e*e+f*f),b=-1);d=0;0!=c&&(d=Math.atan2(b*e,b*f));if(0!=c||0<this.ns){if(b=1/this.ns,
c=Math.pow(c/(this.a*this.f0),b),c=Proj4js.common.phi2z(this.e,c),-9999==c)return null}else c=-Proj4js.common.HALF_PI;d=Proj4js.common.adjust_lon(d/this.ns+this.long0);a.x=d;a.y=c;return a}};
Proj4js.Proj.laea={S_POLE:1,N_POLE:2,EQUIT:3,OBLIQ:4,init:function(){var a=Math.abs(this.lat0);this.mode=Math.abs(a-Proj4js.common.HALF_PI)<Proj4js.common.EPSLN?0>this.lat0?this.S_POLE:this.N_POLE:Math.abs(a)<Proj4js.common.EPSLN?this.EQUIT:this.OBLIQ;if(0<this.es)switch(this.qp=Proj4js.common.qsfnz(this.e,1),this.mmf=0.5/(1-this.es),this.apa=this.authset(this.es),this.mode){case this.N_POLE:case this.S_POLE:this.dd=1;break;case this.EQUIT:this.rq=Math.sqrt(0.5*this.qp);this.dd=1/this.rq;this.xmf=
1;this.ymf=0.5*this.qp;break;case this.OBLIQ:this.rq=Math.sqrt(0.5*this.qp),a=Math.sin(this.lat0),this.sinb1=Proj4js.common.qsfnz(this.e,a)/this.qp,this.cosb1=Math.sqrt(1-this.sinb1*this.sinb1),this.dd=Math.cos(this.lat0)/(Math.sqrt(1-this.es*a*a)*this.rq*this.cosb1),this.ymf=(this.xmf=this.rq)/this.dd,this.xmf*=this.dd}else this.mode==this.OBLIQ&&(this.sinph0=Math.sin(this.lat0),this.cosph0=Math.cos(this.lat0))},forward:function(a){var c,b,d=a.x,e=a.y,d=Proj4js.common.adjust_lon(d-this.long0);if(this.sphere){var f,
g,i;i=Math.sin(e);g=Math.cos(e);f=Math.cos(d);switch(this.mode){case this.OBLIQ:case this.EQUIT:b=this.mode==this.EQUIT?1+g*f:1+this.sinph0*i+this.cosph0*g*f;if(b<=Proj4js.common.EPSLN)return Proj4js.reportError("laea:fwd:y less than eps"),null;b=Math.sqrt(2/b);c=b*g*Math.sin(d);b*=this.mode==this.EQUIT?i:this.cosph0*i-this.sinph0*g*f;break;case this.N_POLE:f=-f;case this.S_POLE:if(Math.abs(e+this.phi0)<Proj4js.common.EPSLN)return Proj4js.reportError("laea:fwd:phi < eps"),null;b=Proj4js.common.FORTPI-
0.5*e;b=2*(this.mode==this.S_POLE?Math.cos(b):Math.sin(b));c=b*Math.sin(d);b*=f}}else{var h=g=0,j=0;f=Math.cos(d);d=Math.sin(d);i=Math.sin(e);i=Proj4js.common.qsfnz(this.e,i);if(this.mode==this.OBLIQ||this.mode==this.EQUIT)g=i/this.qp,h=Math.sqrt(1-g*g);switch(this.mode){case this.OBLIQ:j=1+this.sinb1*g+this.cosb1*h*f;break;case this.EQUIT:j=1+h*f;break;case this.N_POLE:j=Proj4js.common.HALF_PI+e;i=this.qp-i;break;case this.S_POLE:j=e-Proj4js.common.HALF_PI,i=this.qp+i}if(Math.abs(j)<Proj4js.common.EPSLN)return Proj4js.reportError("laea:fwd:b < eps"),
null;switch(this.mode){case this.OBLIQ:case this.EQUIT:j=Math.sqrt(2/j);b=this.mode==this.OBLIQ?this.ymf*j*(this.cosb1*g-this.sinb1*h*f):(j=Math.sqrt(2/(1+h*f)))*g*this.ymf;c=this.xmf*j*h*d;break;case this.N_POLE:case this.S_POLE:0<=i?(c=(j=Math.sqrt(i))*d,b=f*(this.mode==this.S_POLE?j:-j)):c=b=0}}a.x=this.a*c+this.x0;a.y=this.a*b+this.y0;return a},inverse:function(a){a.x-=this.x0;a.y-=this.y0;var c=a.x/this.a,b=a.y/this.a,d;if(this.sphere){var e=0,f,g=0;f=Math.sqrt(c*c+b*b);d=0.5*f;if(1<d)return Proj4js.reportError("laea:Inv:DataError"),
null;d=2*Math.asin(d);if(this.mode==this.OBLIQ||this.mode==this.EQUIT)g=Math.sin(d),e=Math.cos(d);switch(this.mode){case this.EQUIT:d=Math.abs(f)<=Proj4js.common.EPSLN?0:Math.asin(b*g/f);c*=g;b=e*f;break;case this.OBLIQ:d=Math.abs(f)<=Proj4js.common.EPSLN?this.phi0:Math.asin(e*this.sinph0+b*g*this.cosph0/f);c*=g*this.cosph0;b=(e-Math.sin(d)*this.sinph0)*f;break;case this.N_POLE:b=-b;d=Proj4js.common.HALF_PI-d;break;case this.S_POLE:d-=Proj4js.common.HALF_PI}c=0==b&&(this.mode==this.EQUIT||this.mode==
this.OBLIQ)?0:Math.atan2(c,b)}else{d=0;switch(this.mode){case this.EQUIT:case this.OBLIQ:c/=this.dd;b*=this.dd;g=Math.sqrt(c*c+b*b);if(g<Proj4js.common.EPSLN)return a.x=0,a.y=this.phi0,a;f=2*Math.asin(0.5*g/this.rq);e=Math.cos(f);c*=f=Math.sin(f);this.mode==this.OBLIQ?(d=e*this.sinb1+b*f*this.cosb1/g,b=g*this.cosb1*e-b*this.sinb1*f):(d=b*f/g,b=g*e);break;case this.N_POLE:b=-b;case this.S_POLE:d=c*c+b*b;if(!d)return a.x=0,a.y=this.phi0,a;d=1-d/this.qp;this.mode==this.S_POLE&&(d=-d)}c=Math.atan2(c,
b);d=this.authlat(Math.asin(d),this.apa)}a.x=Proj4js.common.adjust_lon(this.long0+c);a.y=d;return a},P00:0.3333333333333333,P01:0.17222222222222222,P02:0.10257936507936508,P10:0.06388888888888888,P11:0.0664021164021164,P20:0.016415012942191543,authset:function(a){var c,b=[];b[0]=a*this.P00;c=a*a;b[0]+=c*this.P01;b[1]=c*this.P10;c*=a;b[0]+=c*this.P02;b[1]+=c*this.P11;b[2]=c*this.P20;return b},authlat:function(a,c){var b=a+a;return a+c[0]*Math.sin(b)+c[1]*Math.sin(b+b)+c[2]*Math.sin(b+b+b)}};
Proj4js.Proj.aeqd={init:function(){this.sin_p12=Math.sin(this.lat0);this.cos_p12=Math.cos(this.lat0)},forward:function(a){var c=a.x,b,d=Math.sin(a.y),e=Math.cos(a.y),c=Proj4js.common.adjust_lon(c-this.long0),f=Math.cos(c),g=this.sin_p12*d+this.cos_p12*e*f;if(Math.abs(Math.abs(g)-1)<Proj4js.common.EPSLN){if(b=1,0>g){Proj4js.reportError("aeqd:Fwd:PointError");return}}else b=Math.acos(g),b/=Math.sin(b);a.x=this.x0+this.a*b*e*Math.sin(c);a.y=this.y0+this.a*b*(this.cos_p12*d-this.sin_p12*e*f);return a},
inverse:function(a){a.x-=this.x0;a.y-=this.y0;var c=Math.sqrt(a.x*a.x+a.y*a.y);if(c>2*Proj4js.common.HALF_PI*this.a)Proj4js.reportError("aeqdInvDataError");else{var b=c/this.a,d=Math.sin(b),b=Math.cos(b),e=this.long0,f;if(Math.abs(c)<=Proj4js.common.EPSLN)f=this.lat0;else{f=Proj4js.common.asinz(b*this.sin_p12+a.y*d*this.cos_p12/c);var g=Math.abs(this.lat0)-Proj4js.common.HALF_PI;Math.abs(g)<=Proj4js.common.EPSLN?e=0<=this.lat0?Proj4js.common.adjust_lon(this.long0+Math.atan2(a.x,-a.y)):Proj4js.common.adjust_lon(this.long0-
Math.atan2(-a.x,a.y)):(g=b-this.sin_p12*Math.sin(f),Math.abs(g)<Proj4js.common.EPSLN&&Math.abs(a.x)<Proj4js.common.EPSLN||(Math.atan2(a.x*d*this.cos_p12,g*c),e=Proj4js.common.adjust_lon(this.long0+Math.atan2(a.x*d*this.cos_p12,g*c))))}a.x=e;a.y=f;return a}}};
Proj4js.Proj.moll={init:function(){},forward:function(a){for(var c=a.y,b=Proj4js.common.adjust_lon(a.x-this.long0),d=c,e=Proj4js.common.PI*Math.sin(c),f=0;;f++){var g=-(d+Math.sin(d)-e)/(1+Math.cos(d)),d=d+g;if(Math.abs(g)<Proj4js.common.EPSLN)break;50<=f&&Proj4js.reportError("moll:Fwd:IterationError")}d/=2;Proj4js.common.PI/2-Math.abs(c)<Proj4js.common.EPSLN&&(b=0);c=0.900316316158*this.a*b*Math.cos(d)+this.x0;d=1.4142135623731*this.a*Math.sin(d)+this.y0;a.x=c;a.y=d;return a},inverse:function(a){var c;
a.x-=this.x0;c=a.y/(1.4142135623731*this.a);0.999999999999<Math.abs(c)&&(c=0.999999999999);c=Math.asin(c);var b=Proj4js.common.adjust_lon(this.long0+a.x/(0.900316316158*this.a*Math.cos(c)));b<-Proj4js.common.PI&&(b=-Proj4js.common.PI);b>Proj4js.common.PI&&(b=Proj4js.common.PI);c=(2*c+Math.sin(2*c))/Proj4js.common.PI;1<Math.abs(c)&&(c=1);c=Math.asin(c);a.x=b;a.y=c;return a}};
;
Drupal.behaviors.views_accordion = {
  attach: function(context) {
    if(Drupal.settings.views_accordion){
      (function ($) {
        $.each(Drupal.settings.views_accordion, function(id) {
          /* Our view settings */
          var usegroupheader = this.usegroupheader;
          var viewname = this.viewname;
          var display = this.display;

          /* Our panel heightStyle setting */
          var heightStyle = (this.autoheight == 1) ? 'auto' : (this.fillspace == 1 ? 'fill' : 'content');

          /* the selectors we have to play with */
          var displaySelector = '.view-id-' + viewname + '.view-display-id-' + display + ' > .view-content';
          var headerSelector = this.header;

          /* Prepare our markup for jquery ui accordion */
          $(displaySelector + ' ' + headerSelector + ':not(.ui-accordion-header)').each(function(i){
        	// Hash to use for accordion navigation option.
            var hash = "#" + viewname + "-" + display + "-" + i;
            var $this = $(this);
            var $link = $this.find('a');
            // if the header is not already using an anchor tag, add one
            if($link.length == 0){
              // setup anchor tag for navigation
              $this.wrapInner('<a href="' + hash + '"></a>');
            }
            // if there are already, they wont be clickable with js enabled, we'll use them for accordion navigation
            else{
              // @FIXME ?
              // We are currently destroying the original link, though search crawlers will stil see it.
              // Links in accordions are NOT clickable and leaving them would kill deep linking.
              $link.get(0).href = hash;
            }

            // Wrap the accordion content within a div if necessary
            if (!usegroupheader) {
              $this.siblings().wrapAll('<div></div>');
            }
          });

          var options = {};
          if (this.newoptions) {
            /* jQuery UI accordion options format changed for jquery >= 1.9 */
            options = {
              header: headerSelector,
              animated: this.animated,
              active: this.rowstartopen,
              collapsible: this.collapsible,
              event: this.event,
              heightStyle: this.autoheight ? 'auto' : this.fillspace ? 'fill' : 'content',
            };
          }
          else {
            options = {
              header: headerSelector,
              animated: this.animated,
              active: this.rowstartopen,
              collapsible: this.collapsible,
              autoHeight: this.autoheight,
              heightStyle: heightStyle,
              event: this.event,
              fillSpace: this.fillspace,
              navigation: this.navigation,
              clearstyle: this.clearstyle
            };
          }
          /* jQuery UI accordion call */
          $(displaySelector + ':not(.ui-accordion)').accordion(options);
        });
      })(jQuery);
    }
  }
};
;
(function ($) {

// Behavior to load FlexSlider
Drupal.behaviors.flexslider = {
  attach: function(context, settings) {
    $('.flexslider', context).once('flexslider', function() {
      $(this).each(function() {
        var $this = $(this);
        var id = $this.attr('id');
        if (settings.flexslider !== undefined) {
          var optionset = settings.flexslider.instances[id];
          if (optionset) {
            $this.flexslider(settings.flexslider.optionsets[optionset]);
          }
          else {
            $this.flexslider();
          }
        }
      });
      // Remove width/height attributes
      $(this).find('ul.slides li img').removeAttr('height');
      $(this).find('ul.slides li img').removeAttr('width');  
    });
  }
};

}(jQuery));
;
(function ($) {
  // @todo convert to use Drupal.behaviors
  // @todo add configuration options

  // Register callback to save references to flexslider instances. Allows
  // Views Slideshow controls to affect the slider
  function flexslider_views_slideshow_register(fullId, slider) {
    Drupal.flexsliderViewsSlideshow.active = Drupal.flexsliderViewsSlideshow.active || {};
    Drupal.flexsliderViewsSlideshow.active[fullId] = slider;
  }

  Drupal.behaviors.flexsliderViewsSlideshow = {
    attach: function (context) {
      $('.flexslider_views_slideshow_main:not(.flexslider_views_slideshow-processed)', context).addClass('flexslider_views_slideshow-processed').each(function() {
        // Get the ID of the slideshow
        var fullId = '#' + $(this).attr('id');

        // Create settings container
        var settings = Drupal.settings.flexslider_views_slideshow[fullId];

        //console.log(settings);

        // @todo map the settings from the form to their javascript equivalents
        settings.targetId = fullId;
        
        settings.loaded = false;

        // Assign default settings
        settings.opts = {
          animation:settings.animation,
          slideDirection:settings.slideDirection,
          slideshow:settings.slideshow,
          slideshowSpeed:settings.slideshowSpeed,
          animationDuration:settings.animationDuration,
          directionNav:settings.directionNav,
          controlNav:settings.controlNav,
          keyboardNav:settings.keyboardNav,
          mousewheel:settings.mousewheel,
          prevText:settings.prevText,
          nextText:settings.nextText,
          pausePlay:settings.pausePlay,
          pauseText:settings.pauseText,
          playText:settings.playText,
          randomize:settings.randomize,
          slideToStart:settings.slideToStart,
          animationLoop:settings.animationLoop,
          pauseOnAction:settings.pauseOnAction,
          pauseOnHover:settings.pauseOnHover,
          controlsContainer:settings.controlsContainer,
          manualControls:settings.manualControls,
          start: function(slider) {
            flexslider_views_slideshow_register(fullId, slider);
          }
        };

        Drupal.flexsliderViewsSlideshow.load(fullId);
      });
    }
  };


  // Initialize the flexslider object
  Drupal.flexsliderViewsSlideshow = Drupal.flexsliderViewsSlideshow || {};

  // Load mapping from Views Slideshow to FlexSlider
  Drupal.flexsliderViewsSlideshow.load = function(fullId) {
    var settings = Drupal.settings.flexslider_views_slideshow[fullId];

    // Ensure the slider isn't already loaded
    if (!settings.loaded) {
      $(settings.targetId + " .flexslider").flexslider(settings.opts);
      settings.loaded = true;
    }
  }

  // Pause mapping from Views Slideshow to FlexSlider
  Drupal.flexsliderViewsSlideshow.pause = function (options) {
    Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].pause();
    Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].manualPause = true;
  }

  // Play mapping from Views Slideshow to FlexSlider
  Drupal.flexsliderViewsSlideshow.play = function (options) {
    Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].resume();
    Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].manualPause = false;
  }
  
  Drupal.flexsliderViewsSlideshow.nextSlide = function (options) {
    var target = Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].getTarget('next');

    if (Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].canAdvance(target)) {
      Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].flexAnimate(target, Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].vars.pauseOnAction);
    }
  }
  Drupal.flexsliderViewsSlideshow.previousSlide = function (options) {
    var target = Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].getTarget('prev');

    if (Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].canAdvance(target)) {
      Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].flexAnimate(target, Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].vars.pauseOnAction);
    }
  }
  // @todo add support for jquery mobile page init
})(jQuery);;
(function ($) {

Drupal.googleanalytics = {};

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      // Is the clicked URL internal?
      if (Drupal.googleanalytics.isInternal(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox')) {
          // Do nothing here. The custom event will handle all tracking.
          //console.info("Click on .colorbox item has been detected.");
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (Drupal.settings.googleanalytics.trackDownload && Drupal.googleanalytics.isDownload(this.href)) {
          // Download link clicked.
          ga("send", "event", "Downloads", Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(), Drupal.googleanalytics.getPageUrl(this.href));
        }
        else if (Drupal.googleanalytics.isInternalSpecial(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          ga("send", "pageview", { "page": Drupal.googleanalytics.getPageUrl(this.href) });
        }
      }
      else {
        if (Drupal.settings.googleanalytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          ga("send", "event", "Mails", "Click", this.href.substring(7));
        }
        else if (Drupal.settings.googleanalytics.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (Drupal.settings.googleanalytics.trackDomainMode != 2 || (Drupal.settings.googleanalytics.trackDomainMode == 2 && !Drupal.googleanalytics.isCrossDomain(this.hostname, Drupal.settings.googleanalytics.trackCrossDomains))) {
            // External link clicked / No top-level cross domain clicked.
            ga("send", "event", "Outbound links", "Click", this.href);
          }
        }
      }
    });
  });

  // Track hash changes as unique pageviews, if this option has been enabled.
  if (Drupal.settings.googleanalytics.trackUrlFragments) {
    window.onhashchange = function() {
      ga('send', 'pageview', location.pathname + location.search + location.hash);
    }
  }

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  $(document).bind("cbox_complete", function () {
    var href = $.colorbox.element().attr("href");
    if (href) {
      ga("send", "pageview", { "page": Drupal.googleanalytics.getPageUrl(href) });
    }
  });

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
Drupal.googleanalytics.isCrossDomain = function (hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
};

/**
 * Check whether this is a download URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isDownload = function (url) {
  var isDownload = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  return isDownload.test(url);
};

/**
 * Check whether this is an absolute internal URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternal = function (url) {
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return isInternal.test(url);
};

/**
 * Check whether this is a special URL or not.
 *
 * URL types:
 *  - gotwo.module /go/* links.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternalSpecial = function (url) {
  var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
  return isInternalSpecial.test(url);
};

/**
 * Extract the relative internal URL from an absolute internal URL.
 *
 * Examples:
 * - http://mydomain.com/node/1 -> /node/1
 * - http://example.com/foo/bar -> http://example.com/foo/bar
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   Internal website URL
 */
Drupal.googleanalytics.getPageUrl = function (url) {
  var extractInternalUrl = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return url.replace(extractInternalUrl, '');
};

/**
 * Extract the download file extension from the URL.
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   The file extension of the passed url. e.g. "zip", "txt"
 */
Drupal.googleanalytics.getDownloadExtension = function (url) {
  var extractDownloadextension = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  var extension = extractDownloadextension.exec(url);
  return (extension === null) ? '' : extension[1];
};

})(jQuery);
;
