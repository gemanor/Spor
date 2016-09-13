/* 
 * Created on : Sep 21, 2015
 * Author     : gmanor
 */

define(['jquery', 'underscore', 'backbone', 'iscroll', 'BaseView', 'LevelsCollection', 'LevelModel', 'text!templates/PlaygroundView.html', 'text!templates/EndPopupView.html'],
        function ($, _, Backbone, IScroll, BaseView, LevelsCollection, LevelModel, tpl, popupTpl) {
            (function ($) {
                $.fn.textfill = function (options) {
                    var fontSize = options.maxFontPixels;
                    var ourText = $('span:visible:first', this);
                    var maxHeight = $(this).height();
                    var maxWidth = $(this).width();
                    var textHeight;
                    var textWidth;
                    do {
                        ourText.css('font-size', fontSize);
                        textHeight = ourText.height();
                        textWidth = ourText.width();
                        fontSize = fontSize - 1;
                    } while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 3);
                    return this;
                }
            })($);
            var timer = function (callback, delay) {
                var id, started, remaining = delay, running;

                this.start = function () {
                    running = true;
                    started = new Date();
                    id = setTimeout(callback, delay);
                };

                this.stop = function () {
                    running = false;
                    clearTimeout(id);
                    remaining = new Date() - started;
                };

                this.getTimeLeft = function () {
                    if (running) {
                        this.stop();
                    }

                    return remaining;
                };

                this.getStateRunning = function () {
                    return running;
                };

                this.start();
            };
            var view = BaseView.extend({
                tagName: 'div',
                className: 'clearfix playgroundContainer',
                successStatusArrLength: 12,
                failedStatusArrLength: 8,
                settings: {
                    iconsArray: ["2-Mac.svg", "24-Hours.svg", "3D-Glass.svg", "3D-Grid.svg", "Abacus.svg", "Acorn.svg", "Add-Pin.svg", "Aid-Kit.svg", "Air-Hostess-1.svg", "Air-Hostess-2.svg", "Airconditioner.svg", "Airdrop-Box.svg", "Airship.svg", "Alarm-Clock.svg", "Alien-2.svg", "Alien.svg", "Ambulance-2.svg", "Ambulance.svg", "American-Football.svg", "Analytics.svg", "Anchor.svg", "Android.svg", "Angrybird.svg", "Antenna.svg", "Anvil.svg", "Apartment-2.svg", "Apartment-3.svg", "Apartment.svg", "Apple 2.svg", "Application-Map.svg", "Aroma.svg", "Arrow 2.svg", "Arrow.svg", "Artist.svg", "Astronaut 2.svg", "Astronaut.svg", "Atm.svg", "Atv.svg", "Auction.svg", "Axe.svg", "Baby-Apron.svg", "Baby-Bed.svg", "Baby-Cart.svg", "Baby-Mobile.svg", "Baby-Pin.svg", "Baby.svg", "Backboard.svg", "Bag 2.svg", "Bag-2.svg", "Bag-3.svg", "Bag-Present.svg", "Bag.svg", "Bait.svg", "Balance-2.svg", "Balance.svg", "Balloon 2.svg", "Balloon.svg", "Bamboo.svg", "Bananana.svg", "Bank.svg", "Banknote.svg", "Barcode-Scanner.svg", "Barista-Man.svg", "Barista-Woman.svg", "Barn.svg", "Barrier.svg", "Barth.svg", "Baseball.svg", "Basket-2.svg", "Basket.svg", "Basketball.svg", "Batman.svg", "Battery-Charging.svg", "Battery.svg", "Bbq.svg", "Beach-2.svg", "Beach-3.svg", "Beach-Boy.svg", "Beach-Chair.svg", "Beach.svg", "Beaker.svg", "Bear.svg", "Beard.svg", "Bed-2.svg", "Bed.svg", "Beer.svg", "Beetle-2.svg", "Beetle.svg", "Bell 2.svg", "Bell-Pepper.svg", "Bell.svg", "Belt.svg", "Bench-Vise-2.svg", "Bench-Vise.svg", "Bin-2.svg", "Bin.svg", "Binder-Clip.svg", "Binocular.svg", "Birthday-Cake.svg", "Blender.svg", "Block-Sign.svg", "Block.svg", "Blood-Bag.svg", "Boat.svg", "Boiling.svg", "Bomb.svg", "Bonsai.svg", "Book-2.svg", "Book-Cart.svg", "Book-Open.svg", "Book.svg", "Books.svg", "Bookshelf-2.svg", "Bookshelf.svg", "Boots-2.svg", "Boots.svg", "Boss-1.svg", "Boss-2.svg", "Boss-3.svg", "Boss-4.svg", "Boss-5.svg", "Boss-6.svg", "Bottle.svg", "Bowling.svg", "Box-Hand.svg", "Box-Open.svg", "Box-Trolley.svg", "Box.svg", "Boxes.svg", "Boxing-Gloves.svg", "Bread-2.svg", "Bread-3.svg", "Bread.svg", "Breaker.svg", "Brick.svg", "Briefcase 2.svg", "Briefcase 3.svg", "Briefcase-2.svg", "Briefcase.svg", "Broadcasting-Truck.svg", "Broccoli.svg", "Broken-Heart.svg", "Broom.svg", "Brush 2.svg", "Brush-2.svg", "Buildings-2.svg", "Bull.svg", "Bulldozer-2.svg", "Bulldozer.svg", "Bullet.svg", "Bullhorn.svg", "Burglar.svg", "Bus-2.svg", "Bus-3.svg", "Bus.svg", "Business-News.svg", "Business-Plan.svg", "Businessman-1.svg", "Businessman-2.svg", "Businessman-3.svg", "Businessman-4.svg", "Businessman-5.svg", "Businessman-6.svg", "Businesswoman-1.svg", "Businesswoman-2.svg", "Businesswoman-3.svg", "Businesswoman-4.svg", "Businesswoman-5.svg", "Butterfly.svg", "Button.svg", "Cabinet.svg", "Cable-Car.svg", "Calculator.svg", "Calendar-2.svg", "Calendar-Date.svg", "Calendar.svg", "Camera-2.svg", "Camera-Back.svg", "Camera-Front.svg", "Camera.svg", "Cameraman.svg", "Camp.svg", "Candle.svg", "Candles.svg", "Candy-2.svg", "Candy-3.svg", "Candy.svg", "Cannon.svg", "Canoe.svg", "Captain-America.svg", "Captain-Shield.svg", "Car-Burn.svg", "Car-Jumper.svg", "Car-Key 2.svg", "Car-Key.svg", "Car-Oil-2.svg", "Car-Oil.svg", "Car-Service.svg", "Car-Wash.svg", "Car.svg", "Cards.svg", "Carousel.svg", "Carrot.svg", "Cart.svg", "Cashier-1.svg", "Cashier-2 2.svg", "Cashier-2.svg", "Cashier-3.svg", "Cashier-Woman-.svg", "Cashier.svg", "Casino-Coin.svg", "Cassette.svg", "Castle 2.svg", "Castle.svg", "Caution.svg", "Cctv.svg", "Cd-Box.svg", "Cement-Mixer.svg", "Certificate-2.svg", "Chair-2.svg", "Chair-3.svg", "Chair-4.svg", "Chair.svg", "Chalkboard.svg", "Champagne 2.svg", "Champagne.svg", "Changing-Room.svg", "Charger.svg", "Charlie-Chaplin.svg", "Chat-2.svg", "Chat.svg", "Check 2.svg", "Check.svg", "Checklist.svg", "Cheese.svg", "Chef-1.svg", "Chef-2.svg", "Chef-Woman.svg", "Cheries.svg", "Chess.svg", "Chessboard.svg", "Chest.svg", "Chicken-2.svg", "Chicken.svg", "Chili.svg", "Chocolate.svg", "Christmas-Tree.svg", "Cigarette.svg", "Circus-Tent.svg", "Clay-Pot.svg", "Clipboard-Plan.svg", "Cloth-Rack.svg", "Clothes-Stand-2.svg", "Cloud-Music-Download.svg", "Cloud-Music.svg", "Cloudy.svg", "Clown.svg", "Club.svg", "Cocktail-Molotov.svg", "Cocktail.svg", "Coconut.svg", "Coding-Html.svg", "Coding.svg", "Coffee-Machine.svg", "Coffee-Paper-Glass.svg", "Coffee-Pot.svg", "Coffee.svg", "Coffin.svg", "Coins-2.svg", "Coins.svg", "Cola.svg", "Color-Bucket.svg", "Color-Rgb.svg", "Column.svg", "Comb.svg", "Comet.svg", "Command.svg", "Communication-Globe.svg", "Compass.svg", "Complain.svg", "Computer-Desk.svg", "Condom.svg", "Construction-Blueprint-2.svg", "Construction-Blueprint.svg", "Construction-Helm.svg", "Construction-Worker-1.svg", "Construction-Worker-2.svg", "Construction-Worker-3.svg", "Construction-Worker-4.svg", "Container-Lift.svg", "Container-Ship.svg", "Conveyor-Belt.svg", "Cook-Hat.svg", "Cooker-Hood.svg", "Cookies.svg", "Corn.svg", "Cosmetic-Cream.svg", "Coupons.svg", "Crab.svg", "Crosshair.svg", "Crown.svg", "Cry-Smiley.svg", "Cs-Burn.svg", "Cube.svg", "Cup.svg", "Cupcake.svg", "Currencies.svg", "Cutter 2.svg", "Cutter.svg", "Dandy.svg", "Dartboard.svg", "Darth-Vader.svg", "Dashboard.svg", "Database-Cloud.svg", "Degree.svg", "Delivery-2.svg", "Delivery-Man-2.svg", "Delivery-Man.svg", "Desert.svg", "Design-Table.svg", "Design-Tools.svg", "Designer-Bag.svg", "Desk.svg", "Diamond.svg", "Dices.svg", "Diploma.svg", "Direction-Sign.svg", "Director-Chair.svg", "Divider.svg", "Dj.svg", "Dna.svg", "Doctor-1.svg", "Doctor-2.svg", "Doctor-3.svg", "Document-Files.svg", "Dodge.svg", "Dolphin.svg", "Domino.svg", "Donut.svg", "Door-Sign.svg", "Download-Computer.svg", "Drakkar.svg", "Drawer 2.svg", "Drawer-2.svg", "Drawing-Tablet.svg", "Drawing.svg", "Drill.svg", "Drum.svg", "Drums.svg", "Dumbbell-2.svg", "Dumbbell.svg", "Dump-Truck.svg", "E-Watch.svg", "Easter.svg", "Eco-Car.svg", "Eco-Factory.svg", "Eco-Oil.svg", "Education-Globe.svg", "Egg-Holder.svg", "Electric-Saw.svg", "Electric-Scooter.svg", "Emergency-Star.svg", "Engagement-Ring.svg", "Envelope-2.svg", "Escalator.svg", "Euro-Coin.svg", "Eve.svg", "Excavator.svg", "Exercise-Bike.svg", "Explorer-Hat.svg", "Eye.svg", "Eyedropper.svg", "Eyeglass.svg", "Eyeglasses.svg", "Face-Mask.svg", "Face-Powder.svg", "Factory.svg", "Fan.svg", "Farm.svg", "Farmer.svg", "Fashionista.svg", "Fax.svg", "Fence.svg", "Fill-Heart.svg", "Film.svg", "Filter.svg", "Fins.svg", "Fire-Alarm.svg", "Fire-Extinguisher.svg", "Fire-Truck-2.svg", "Fire-Truck.svg", "Fireman-2.svg", "Fireman.svg", "Firework.svg", "Fish.svg", "Flag-Star.svg", "Flag.svg", "Flak-Vest.svg", "Flash.svg", "Flashlight.svg", "Floppy-Disk.svg", "Flower.svg", "Flush-Toilet.svg", "Food-Dome 2.svg", "Food-Dome.svg", "Foot-Soak.svg", "Fork-Spoon.svg", "Fork.svg", "Forklift.svg", "French-Fries.svg", "Fried-Egg.svg", "Frightened-Smiley.svg", "Furby.svg", "Gameboy-Advance.svg", "Gameboy.svg", "Garage 2.svg", "Garage.svg", "Gardern-Tools.svg", "Gas-Mask.svg", "Gas-Station.svg", "Gas-Stove.svg", "Gas.svg", "Gear.svg", "Geek.svg", "Gingerbread.svg", "Girl-Shoes.svg", "Glad-Smiley.svg", "Glass-Fragile.svg", "Glasses.svg", "Global-Eco.svg", "Globe.svg", "Glue.svg", "Gold-Cart.svg", "Gold-Nuggets.svg", "Golf.svg", "Google-Nest.svg", "Gothic-Man.svg", "Grape.svg", "Graph-Magnifier.svg", "Grater.svg", "Grave.svg", "Grenade.svg", "Grill.svg", "Grinder.svg", "Guitar.svg", "Gun.svg", "Hacker.svg", "Hair-Dresser.svg", "Hammer.svg", "Hammock.svg", "Hamster.svg", "Hand-Block.svg", "Hand-Grip.svg", "Hand-Point.svg", "Handcuffs.svg", "Handycam.svg", "Handyman.svg", "Hanger.svg", "Harddrive.svg", "Harp.svg", "Hat-2.svg", "Hat-3.svg", "Hat.svg", "Headset-2.svg", "Headset.svg", "Heart-Arrow.svg", "Heart-Balloon.svg", "Heart-Pulse.svg", "Heart-Watch.svg", "Heart.svg", "Heater.svg", "Helicopter.svg", "Helm.svg", "Helmet 2.svg", "Helmet.svg", "Hexagon.svg", "Hockey.svg", "Home-Theater.svg", "Hook.svg", "Hot-Dog.svg", "Hotel-2.svg", "Hotel-Employee.svg", "Hotel.svg", "Hourglass.svg", "House 2.svg", "House-2.svg", "House-3.svg", "House-4.svg", "House-5.svg", "Humvee-2.svg", "Humvee.svg", "Hydrant.svg", "Icecream-2.svg", "Icecream.svg", "Icon-Grid.svg", "Id-Card-2.svg", "Id-Card.svg", "Id-Pass.svg", "Images-Cloud.svg", "Images.svg", "Incense.svg", "Ipad.svg", "Ipod.svg", "Iron.svg", "Jetski.svg", "Jigsaw.svg", "Joystick-2.svg", "Joystick.svg", "Judaism.svg", "Juice-Bucket.svg", "Juice.svg", "Karate.svg", "Kettle.svg", "Key.svg", "Keyboard.svg", "Knife.svg", "Ladder-Truck.svg", "Ladder.svg", "Ladybug.svg", "Lamp 2.svg", "Lamp-2.svg", "Lamp-3.svg", "Lamp-4.svg", "Lamp-5.svg", "Lamp-6.svg", "Lamp.svg", "Landmark.svg", "Lantern.svg", "Laptop-Signal.svg", "Lava-Lamp.svg", "Lawyer.svg", "Lemon.svg", "Letter.svg", "Life-Buoy.svg", "Light-Bulb-2.svg", "Light-Bulb.svg", "Lighter.svg", "Lightning.svg", "Link.svg", "Lips.svg", "Lipstick.svg", "List-Board.svg", "Lock.svg", "Locked-Cloud.svg", "Lotion.svg", "Lotus.svg", "Love-Candy.svg", "Love-Letter.svg", "Love-Smiley.svg", "Love-Whale.svg", "Lug-Wrench.svg", "Luggage-Cart.svg", "Lyre.svg", "Magic-Bunny.svg", "Magic-Globe.svg", "Magic-Wand.svg", "Magician.svg", "Magnet.svg", "Magnifier.svg", "Maid.svg", "Mailbox-2.svg", "Mailbox.svg", "Makeup.svg", "Man-1.svg", "Man-10.svg", "Man-11.svg", "Man-12.svg", "Man-13.svg", "Man-14.svg", "Man-15.svg", "Man-16.svg", "Man-17.svg", "Man-18.svg", "Man-2.svg", "Man-3.svg", "Man-4.svg", "Man-5.svg", "Man-6.svg", "Man-7.svg", "Man-8.svg", "Man-9-.svg", "Man-Symbol.svg", "Map.svg", "Marijuana.svg", "Marker-2.svg", "Marker.svg", "Mask.svg", "Match.svg", "Meat.svg", "Medal-2.svg", "Medal.svg", "Medicine-2.svg", "Medicine.svg", "Medicines.svg", "Memorycard.svg", "Menu.svg", "Meteor.svg", "Microchip.svg", "Microphone 2.svg", "Microphone-2.svg", "Microphone-3.svg", "Microphone-4.svg", "Microscope.svg", "Microwave.svg", "Milk-Bottle.svg", "Mind-Map-Paper.svg", "Minecart.svg", "Minion.svg", "Mirror.svg", "Mixer-Truck.svg", "Mixer.svg", "Mobilephone-2.svg", "Mobilephone.svg", "Money-Bag 2.svg", "Money-Graph.svg", "Money-Increase.svg", "Money.svg", "Motorbike.svg", "Mountain.svg", "Moustache.svg", "Movie-Countdown.svg", "Movie-Event.svg", "Movie-Film-2.svg", "Movie-Slate.svg", "Multitask.svg", "Muscle.svg", "Mushroom.svg", "Music-Equalizer.svg", "Music-Jack.svg", "Music-Note.svg", "Muslim.svg", "Nail-Varnish.svg", "Necklace.svg", "Necktie.svg", "Needle.svg", "Ninja.svg", "Noodles.svg", "Note.svg", "Nucelar-Plant.svg", "Nuclear-Mushroom.svg", "Nurse-1.svg", "Nurse-2.svg", "Nurse-3.svg", "Nurse-4.svg", "Nurse-Hat.svg", "Office-Chair.svg", "Oil-Rig.svg", "Old-Camera.svg", "Old-Car-2.svg", "Old-Car.svg", "Old-Computer.svg", "Online-Shopping.svg", "Open-24.svg", "Open-Sign.svg", "Orange.svg", "Outdoor-Umbrella-Chair.svg", "Oven-Glove.svg", "Owl-Book.svg", "Oxygen-Tank.svg", "Pacifier.svg", "Pacman-Ghost.svg", "Pacman.svg", "Paint-Bucket.svg", "Paint-Roll.svg", "Paint-Tube.svg", "Palette.svg", "Pan.svg", "Pantone.svg", "Pants.svg", "Paper-Bird.svg", "Paper-Cutter.svg", "Paper-Plane.svg", "Paper-Puncher.svg", "Paper-Tape.svg", "Party-Flag.svg", "Party-Hat.svg", "Party-Poppers.svg", "Passport.svg", "Patient-Monitor.svg", "Peace.svg", "Pear.svg", "Pen-2.svg", "Pen.svg", "Pencil-2.svg", "Pencil.svg", "Pepper-Salt.svg", "Percentage.svg", "Perfume.svg", "Phamacy-Sign.svg", "Phone-Booth.svg", "Phone2.svg", "Phone3.svg", "Phonograph.svg", "Photocopier.svg", "Picky-Bank-2.svg", "Pie.svg", "Pilot-1.svg", "Pilot-2.svg", "Pin-2.svg", "Pin.svg", "Pine-Tree.svg", "Pipe.svg", "Pirate-Flag.svg", "Pizza.svg", "Plane-Ticket.svg", "Plane.svg", "Plaster.svg", "Plier.svg", "Plug 2.svg", "Plug-Socket.svg", "Plug.svg", "Pocket-Knife.svg", "Podium.svg", "Poison.svg", "Pokeball.svg", "Polaroid.svg", "Police-Car-2.svg", "Police-Car.svg", "Policeman-1.svg", "Policeman-2.svg", "Policeman-3.svg", "Pool.svg", "Poop.svg", "Popcorn.svg", "Post-It-Pin.svg", "Post-It.svg", "Postcard.svg", "Pot.svg", "Pour.svg", "Power-Supply.svg", "Predator.svg", "Present.svg", "Pretzel.svg", "Printer.svg", "Prism-2.svg", "Prism-3.svg", "Prisoner.svg", "Prize-Cup.svg", "Pro-Printer.svg", "Programming.svg", "Projector 2.svg", "Projector.svg", "Propeller-Plane.svg", "Protein-Powder.svg", "Punk-Woman.svg", "Punk.svg", "Purse.svg", "Quill.svg", "R2D2.svg", "Radar.svg", "Radio-2.svg", "Radio-3.svg", "Radio-4.svg", "Radio-Car.svg", "Radio.svg", "Rain.svg", "Rainbow.svg", "Rapper-2.svg", "Rapper.svg", "Rasta.svg", "Record-Player.svg", "Record.svg", "Recorder-Old.svg", "Recycle-Bin.svg", "Refrigerator 2.svg", "Refrigerator.svg", "Reindeer.svg", "Remote.svg", "Reward-Star.svg", "Ring-2.svg", "Ring.svg", "Road-Block.svg", "Road-Worker-1.svg", "Road-Worker-2.svg", "Road.svg", "Robot.svg", "Rocker.svg", "Rocks.svg", "Roll-Paper.svg", "Rollerblade.svg", "Rolling-Pin.svg", "Rolloflex.svg", "Room-Key.svg", "Rubber-2.svg", "Rubber-Stamp.svg", "Rubber.svg", "Rv-2.svg", "Rv.svg", "Safe 2.svg", "Safe.svg", "Safety-Belt.svg", "Safety-Glasses.svg", "Safety-Vest.svg", "Santa-Sled.svg", "Santa.svg", "Satellite-Dish.svg", "Satellite.svg", "Sausage.svg", "Saw.svg", "Scale-Weight 2.svg", "Scale-Weight.svg", "Scaner.svg", "Scarecrow.svg", "School-Bus-2.svg", "School-Bus.svg", "School.svg", "Science.svg", "Scientist-1.svg", "Scientist-2.svg", "Scientist-Woman-1.svg", "Scientist-Woman-2.svg", "Scream.svg", "Screw-Driver.svg", "Screw.svg", "Script-Paper.svg", "Sea.svg", "Secret-Agent-2.svg", "Secret-Agent.svg", "Service-Bell.svg", "Settings-2.svg", "Settings-5.svg", "Settings.svg", "Seven.svg", "Sewing-Machine.svg", "Shaver.svg", "Shield-3.svg", "Shield.svg", "Ship.svg", "Shirt.svg", "Shop 2.svg", "Shop-2.svg", "Shop-Sign.svg", "Shop-Truck.svg", "Shop.svg", "Shorts.svg", "Shovel 2.svg", "Shovel.svg", "Shower.svg", "Shuriken.svg", "Shuttlecock.svg", "Sim.svg", "Skate.svg", "Skincare.svg", "Skull 2.svg", "Skull.svg", "Slider.svg", "Slippers.svg", "Slotmachine.svg", "Smartphone-2.svg", "Smartphone-Message.svg", "Smile-Smiley.svg", "Sneakers-2.svg", "Sneakers-3.svg", "Sneakers.svg", "Snooker.svg", "Snorkel.svg", "Snow-2.svg", "Snow-Globe.svg", "Snowman-2.svg", "Snowman.svg", "Soccer-Field.svg", "Soccer-Shoes.svg", "Soccer.svg", "Sock-Present.svg", "Socks.svg", "Sofa-2.svg", "Sofa-3.svg", "Sofa-4.svg", "Sofa.svg", "Soldier-2.svg", "Soldier-3.svg", "Soldier.svg", "Spa-Suit.svg", "Space-Invaders.svg", "Space-Shuttle.svg", "Spaceship.svg", "Spade.svg", "Speaker 2.svg", "Speaker-2.svg", "Speaker-3.svg", "Speaker-4.svg", "Speed-Train.svg", "Spongebob.svg", "Sprayer 2.svg", "Sprayer.svg", "Sprout-2.svg", "Sprout-3.svg", "Spy.svg", "Squeezer.svg", "Squid.svg", "Stacking-Rings.svg", "Stamp.svg", "Staple.svg", "Star-Sheriff.svg", "Star.svg", "Start.svg", "Steering-Wheel.svg", "Stethoscope.svg", "Storehouse.svg", "Stove.svg", "Strawberry.svg", "Street-View.svg", "Student-2.svg", "Student-3.svg", "Student-Woman-1.svg", "Student-Woman-2.svg", "Submarine.svg", "Suit.svg", "Suitcase 2.svg", "Suitcase.svg", "Sunglasses-2.svg", "Sunglasses-3.svg", "Sunglasses.svg", "Surfer.svg", "Surgeon.svg", "Sushi.svg", "Sword.svg", "Sync-Cloud.svg", "Syringue.svg", "T-Shirt-2.svg", "T-Shirt.svg", "Table-Lamp.svg", "Table-Set.svg", "Table-Tennis.svg", "Tablet-2.svg", "Tablet-Chart.svg", "Tamagotchi.svg", "Tank.svg", "Taoism.svg", "Tap.svg", "Target-Arrow.svg", "Target.svg", "Taxi-2.svg", "Taxi.svg", "Tea-Cup.svg", "Teacher 2.svg", "Teacher.svg", "Tease-Smiley.svg", "Teddy-Bear.svg", "Telemarketer-Woman-2.svg", "Telescope.svg", "Teletubby.svg", "Television-Shelf.svg", "Television.svg", "Tennis.svg", "Tent 2.svg", "Tent.svg", "Test-Tube 2.svg", "Test-Tube.svg", "Tetris.svg", "Theater.svg", "Thermometer.svg", "Thief.svg", "Think-Different.svg", "Thread.svg", "Ticket.svg", "Time-Bomb.svg", "Time-Burn.svg", "Tips.svg", "Tire-Pump.svg", "Tire.svg", "Toaster.svg", "Toilet-Paper.svg", "Toilets.svg", "Toolsbox-2.svg", "Tooth.svg", "Toothbrush.svg", "Torchlight.svg", "Tow-Truck.svg", "Towel.svg", "Tower-2.svg", "Tower-3.svg", "Tower-4.svg", "Tower-Crane.svg", "Tower.svg", "Tractor-2.svg", "Tractor.svg", "Traffic-Cone.svg", "Traffic-Light.svg", "Train.svg", "Travel-Bag.svg", "Tree.svg", "Truck 2.svg", "Truck-2 2.svg", "Truck-2.svg", "Truck.svg", "Trumpet.svg", "Tuk-Tuk.svg", "Typewriter.svg", "Ufo.svg", "Umbrella.svg", "Underwear-3.svg", "Underwear.svg", "Ups-Truck.svg", "Urban-Man-1.svg", "Urban-Man-2.svg", "Urban-Man-3.svg", "Urban-Man-4.svg", "Urban-Woman.svg", "Usa-Shield.svg", "Usb.svg", "Vacuum.svg", "Vector.svg", "Vespa.svg", "Video-Camera-2.svg", "Video-Camera-3.svg", "Video-Camera.svg", "Videotape.svg", "Violin.svg", "Visa.svg", "Volleyball.svg", "Voltmeter.svg", "Vynile-Record.svg", "Waiter-Suit.svg", "Waiter.svg", "Waitress-1.svg", "Waitress-2.svg", "Walking-Stick.svg", "Walkman.svg", "Walky-Talky.svg", "Wall-E.svg", "Wallet.svg", "Washing-Machine.svg", "Watch.svg", "Water-Bottle.svg", "Water-Bucket.svg", "Water-Gun.svg", "Watermelon.svg", "Wave.svg", "Webcam.svg", "Wedding-Cake.svg", "Wedding.svg", "Wheat.svg", "Wheelbarrow.svg", "Whisk.svg", "Whiskey-2.svg", "Whiskey.svg", "Wifi-Router.svg", "Wind-Flag.svg", "Wind-Vane.svg", "Wind-Wheel.svg", "Windmill-Paper.svg", "Windowsphone.svg", "Wine-Opener.svg", "Wine.svg", "Winner.svg", "Wireless-Phone.svg", "Woman-1.svg", "Woman-10.svg", "Woman-11.svg", "Woman-12.svg", "Woman-13.svg", "Woman-14.svg", "Woman-15.svg", "Woman-2.svg", "Woman-3.svg", "Woman-4.svg", "Woman-5.svg", "Woman-6.svg", "Woman-7.svg", "Woman-8.svg", "Woman-9.svg", "Woman-Symbol.svg", "Wooden-Barrel.svg", "Wooden-Horse.svg", "Wrench-2.svg", "Wrench.svg", "Xbox.svg", "Xylophone.svg", "Yacht.svg", "Yin-Yang.svg"],
                    examLength: 3,
                    exams: 3,
                    numbersRange: 9,
                    numbersArray: [],
                    footerHeight: 40
                },
                state: {
                    itemsObj: [],
                    exams: [],
                    result: 0
                },
                events: {
                    "tap .solutionsScroller li": "solutionClicked",
                    "click .goToNextLevel": "goToNextLevel",
                    "click .reloadLevel": "reloadLevel"
                },
                collection: null,
                goToNextLevel: function (e) {
                    var self = this;
                    self.initialize();
                    if (window.analytics) {
                        window.analytics.trackEvent('Play', 'Start level', ((parseInt(this.settings.level + 1)) + ' | From next button'));
                    }
                },
                reloadLevel: function () {
                    this.initialize({level: this.settings.level});
                    if (window.analytics) {
                        window.analytics.trackEvent('Play', 'Start level', (parseInt(this.settings.level) + ' | From relaod button'));
                    }
                },
                solutionClicked: function (e) {
                    if (this.levelTimeout) {
                        this.$el.find('.examResult .resultSpan').text($(e.target).text()).removeClass('sign').css('font-size', '8px').parent().textfill({maxFontPixels: 100});
                        this.endLevel();
                    }
                },
                adLoaded: false,
                initialize: function (args) {
                    var self = this;
                    if (window.AdMob) {
                        window.AdMob.prepareInterstitial({
                            adId: window.getAdMobId(),
                            autoShow: false
                        });
                    }
                    $(document).one('onAdLoaded', function () {
                        console.log('loaded '+_.random(20));
                        self.adLoaded = true;
                    });
                    self.collection = new LevelsCollection;
                    self.collection.fetch();
                    var localStorageLevel = self.collection.length;
                    if (args && args.level && args.level <= parseInt(localStorageLevel) && args.level <= 150) {
                        _.extend(self.settings, args);
                    } else {
                        localStorageLevel = localStorageLevel < 150 ? localStorageLevel + 1 : localStorageLevel;
                        _.extend(self.settings, {level: localStorageLevel});
                    }
                    self.pageTitle = "Level " + self.settings.level;
                    self.startLevel();
                },
                close: function(){
                    $(document).off('onAdDismiss');
                    return BaseView.prototype.close.call(this);
                },
                template: tpl,
                render: function () {
                    var self = this;
                    self.state = self.generateState();
                    self.viewParams = self.state;
                    self.headerSettings = {text: _$_.t('level')+ ' ' + self.settings.level, hide: false, showHomeBtn: true, showLevelsBtn: true, showProgressBar: true};
                    return BaseView.prototype.render.call(this);
                },
                solutionsIscroll: null,
                afterRender: function () {
                    var self = this;
                    self.resizeElements();
                    self.$el.find('footer').attr('style', '-webkit-animation: transformDTU 2s Linear;opacity:1;');
                    var solutionsIscroll = self.solutionsIscroll == null ? new IScroll('.solutionsWrapper', {mouseWheel: true, tap: true, scrollY: false, scrollX: true}) : self.solutionsIscroll;
                    solutionsIscroll.refresh();
                    this.setLevelTiming();
                },
                levelTimeout: null,
                startLevel: function () {
                    var self = this;
                    var level = self.settings.level;
                    var getLevelSettingsObj = function (level) {
                        var mainFloors = [[2, 3], [3, 6], [3, 5], [3, 4], [3, 3], [4, 6], [4, 5], [4, 4], [5, 7], [5, 6], [5, 5], [6, 7], [6, 6]],
                                floorsLength = mainFloors.length,
                                currentFloor = mainFloors[Math.floor(level / (floorsLength - 1))],
                                examLength = currentFloor[0],
                                exams = currentFloor[1],
                                numbersRange = examLength * ((parseInt(level) % 12) + 1),
                                timeLength = ((Math.floor(level / (floorsLength - 1)) + 1) * 10) * (12 - (((parseInt(level)) % 12)));
                        var levelObj = {
                            examLength: examLength,
                            exams: exams,
                            numbersRange: numbersRange,
                            timeLength: timeLength
                        };
                        return levelObj;
                    };
                    _.extend(this.settings, getLevelSettingsObj(level));
                    this.settings.numbersArray = this.getNumbersArray();
                    this.render();
                },
                setLevelTiming: function () {
                    var self = this;
                    var levelTimingCB = function () {
                        console.log(_.random(20));
                        self.header.$el.find('.levelProgress span').attr('style', '-webkit-animation: levelProgress infinite ' + (self.settings.timeLength) + 's Linear;')
                        self.levelTimeout = new timer(function () {
                            self.endLevel();
                        }, ((self.settings.timeLength) * 1000));
                    }
                    setTimeout(function () {
                        if (self.adLoaded) {
                            $(document).off('onAdDismiss').on('onAdDismiss', levelTimingCB);
                            if (window.AdMob) {
                                window.AdMob.showInterstitial();
                            }
                        } else {
                            levelTimingCB();
                        }
                    }, 2000);
                },
                renderEndPopup: function (status, time) {
                    var self = this;
                    var statusRowFromArr = status == true ? _.random(1,self.successStatusArrLength) : _.random(1,self.failedStatusArrLength);
                    self.$el.find('.popupContainer').html(_.template(popupTpl)({levelSuccess: status, time: time, statusRow: statusRowFromArr}));
                    self.$el.find('.popupWrapper').css('display', 'block');
                },
                endLevel: function () {
                    var self = this;
                    var isResultTrue = parseInt(self.$el.find('.examResult .resultSpan').text()) == parseInt(self.state.result);
                    self.levelTimeout.stop();
                    var time = self.levelTimeout.getTimeLeft();
                    self.levelTimeout = null;
                    self.adLoaded = false;
                    var beautyTime = (time / 1000).toFixed(2) >= 60 ? ((time / 1000).toFixed(2) / 60).toFixed(2) + "m" : (time / 1000).toFixed(2) + "s";
                    if (window.analytics) {
                        window.analytics.trackEvent('Play', 'End level', ('Time: ' + beautyTime + ' | Success: ' + isResultTrue));
                    }
                    if (isResultTrue) {
                        var levelModel = self.collection.get(self.settings.level);
                        if (levelModel) {
                            levelModel.set({time: time});
                        } else {
                            levelModel = new LevelModel({level: self.settings.level, time: time});
                        }
                        self.collection.set(levelModel, {remove: false});
                        levelModel.save();
                    }
                    self.header.$el.find('.levelProgress span').attr('style', '-webkit-animation: levelProgress infinite ' + (self.settings.timeLength) + 's Linear;-webkit-animation-play-state: paused;')
                    self.renderEndPopup(isResultTrue, time);
                },
                resizeElements: function () {
                    var self = this;
                    var resizeResultText = function () {
                        self.$el.find('.examResult').each(function (k, v) {
                            $(v).textfill({maxFontPixels: 100})
                        });
                        if (parseInt($('.resultText').css('font-size')) == 4) {
                            setTimeout(function () {
                                resizeResultText();
                            }, 100);
                        }
                    };
                    var resizeImages = function () {
                        if (self.$el.height() == 0 || parseInt(self.$el.height()) == (self.state.exams.length * 12)) {
                            setTimeout(function () {
                                resizeImages();
                            }, 100);
                            return;
                        }
                        if ($('#examsRowPaddingStyle').length) {
                            $('#examsRowPaddingStyle').remove();
                        }
                        self.$el.css('height', 'auto');
                        if (self.$el.parent().height() > self.$el.height()) {
                            $('head').append(
                                    $('<style/>', {
                                        id: 'examsRowPaddingStyle',
                                        html: '.playgroundContainer .examRow {padding: 6px 0;}'
                                    })
                                    );
                            var baseStyle = 5;
                            do {
                                baseStyle++;
                                $('#examsRowPaddingStyle').html('.playgroundContainer .examRow {padding:' + parseInt(baseStyle) + 'px 0;}');
                            } while ((self.$el.parent().height() - 50) > self.$el.find('.examsContainer').height());
                            self.$el.css('height', '100%');
                        } else {
                            do {
                                self.$el.find('.examsContainer').width((self.$el.find('.examsContainer').width() - 1) + 'px');
                            } while ((self.$el.parent().height() - 50) < self.$el.find('.examsContainer').height());
                        }
                    };
                    _.defer(resizeImages);
                    _.defer(resizeResultText);
                },
                getNumbersArray: function () {
                    var numbers = [];
                    for (var i = 1; i < this.settings.numbersRange + 1; i++) {
                        numbers[i - 1] = i;
                    }
                    return numbers;
                },
                generateState: function () {
                    var state = {};
                    var settings = this.settings;
                    var generateItemsObj = function (settings) {
                        var itemsObj = [], icoArr = [].concat(settings.iconsArray), numArr = settings.numbersArray;
                        for (var i = 0; i < settings.examLength; i++) {
                            var rndNumPlace = Math.floor(Math.random() * numArr.length),
                                    rndIconPlace = Math.floor(Math.random() * icoArr.length);
                            itemsObj.push({
                                icon: icoArr[rndIconPlace],
                                number: numArr[rndNumPlace]
                            });
                            numArr.splice(rndNumPlace, 1);
                            icoArr.splice(rndIconPlace, 1);
                        }
                        return itemsObj;
                    };
                    var generateExam = function () {
                        var exam = [];
                        for (var i = 0; i < settings.examLength; i++) {
                            exam.push(state.itemsObj[Math.floor(Math.random() * state.itemsObj.length)]);
                        }
                        return exam;
                    };
                    var generateExams = function () {
                        var exams = [];
                        var i = 0;
                        while (exams.length < settings.exams) {
                            var exam = {};
                            exam.numbers = generateExam();
                            exam.result = _.pluck(exam.numbers, 'number').reduce(function (previousValue, currentValue, currentIndex, array) {
                                return previousValue + currentValue;
                            });
                            if ((_.pluck(exams, 'result').indexOf(exam.result)) == -1) {
                                exams.push(exam);
                            }
                        }
                        return exams;
                    };
                    var generateResultOptions = function (settings) {
                        var resultValue = state.result || 1,
                                resultOptions = [resultValue],
                                topResultRange = settings.examLength * settings.numbersRange,
                                lowResultRange = settings.examLength * 1,
                                resultsArrLength = Math.min((topResultRange / 3), 6);
                        while (resultOptions.length < resultsArrLength) {
                            var rndVal = Math.floor(Math.random() * (topResultRange - lowResultRange + 1)) + lowResultRange;
                            if (resultOptions.indexOf(rndVal) == -1) {
                                resultOptions.push(rndVal);
                            }
                        }
                        return resultOptions;
                    };
                    state.itemsObj = generateItemsObj(settings);
                    state.exams = generateExams(settings);
                    state.result = state.exams[state.exams.length - 1].result;
                    state.resultOptions = _.shuffle(generateResultOptions(settings));
                    return state;
                }
            });
            return view;
        });