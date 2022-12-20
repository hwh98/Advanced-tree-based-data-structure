var sourceData0 = {"FileName":"/Users/hongweixiang/Documents/MATLAB/COSC520-Advanced algorithm/Advanced-tree-based-algorithm/Tree_Class/avltree.m","RawFileContents":["classdef avltree < handle ","    properties","        root;","        valuearr; % value array waited to be isnert","    end % end properties","","    methods ","        function obj = avltree(X)","            obj.valuearr = X;","        end % function end","","        function obj = insert(obj)","            for i = 1:length(obj.valuearr)","                obj.root = obj.insertrecursive(obj.root, obj.valuearr(i));","            end % end for ","        end % end function","","        function node = insertrecursive(obj, node, value)","            % recursive function to insert key in subtree rotted with node ","            % @para node : (avltreeNode) class object, start from the root node","            % @para value : (int) the integer value we want to insert.","            %1. perform normal binary search tree","            if isempty(node) % true if the node is empty then create node and return","                node = avltreeNode(value);","            else % the node(current) is not empty so traverse the tree","                if value < node.value","                    node.leftnode = obj.insertrecursive(node.leftnode, value); % the site is taken passon the current node object with the value.","                elseif value > node.value","                    node.rightnode = obj.insertrecursive(node.rightnode, value);","                end % end if ","            end % end if ","","            %2. update the height of the ancestor tree.","            node.height = 1 + max(obj.getheight(node.leftnode), obj.getheight(node.rightnode));","            ","            %3. get the balance factor ","            balance = obj.getbalance(node);","            ","            % Make the tree balanced","            %case1 : left left case","            if(balance > 1 && value < node.leftnode.value)","                node = obj.rightrotate(node);","                return;","            end % end if","            % cas2 : right right case","            if(balance < -1 && value > node.rightnode.value)","                node = obj.leftrotate(node);","                return;","            end % end if","","            %case3:left right case","            if(balance > 1 && value > node.leftnode.value)","                node.leftnode = obj.leftrotate(node.leftnode);","                node = obj.rightrotate(node);","                return;","            end %end if","            if (balance < -1 && value < node.rightnode.value)","                node.rightnode = obj.rightrotate(node.rightnode);","                node = obj.leftrotate(node);","                return;","            end % end if","            return;","        end % end function ","","        function obj = rightrotate(obj, nodey)","            %the right rotatetion ","            % para : (avltreeNode) class object, the node we want to start","            % rotate.","            %@obj : the updated new node after right rotation.","            x = nodey.leftnode;","            t2 = x.rightnode;","","            % perform rotation","            x.rightnode = nodey;","            nodey.leftnode = t2;","            %update height","            nodey.height = max(obj.getheight(nodey.leftnode), obj.getheight(nodey.rightnode)) + 1;","            x.height = max(obj.getheight(x.leftnode), obj.getheight(x.rightnode)) + 1;","            obj = x;% update and return new root","            return; ","        end %end function ","","        function obj = leftrotate(obj, nodex)","            % the left roatation. ","            %@para : (avltreeNode) class object, the node we want to start","            % rotate.","            %@obj : the updated new node after left rotation.","            y = nodex.rightnode;","            t2 = y.leftnode;","","            % perform rotation","            y.leftnode = nodex;","            nodex.rightnode = t2;","            %update height","            nodex.height = max(obj.getheight(nodex.leftnode), obj.getheight(nodex.rightnode)) + 1;","            y.height = max(obj.getheight(y.leftnode), obj.getheight(y.rightnode)) + 1;","            obj = y; % update and return new root","            return;","        end % end function ","","        function bfactor = getbalance(obj, node)","            % the balance factor of node N.","            % @para: (avltreeNode) indicate the node where we start count","            % the balance.","            % @return bfactor: (integer) indicate the balance factor","            if isempty(node)","                bfactor = 0;","                return;","            end % end if","            bfactor = obj.getheight(node.leftnode) - obj.getheight(node.rightnode);","            return;","        end % end function ","","        function h = getheight(obj, node)","            % this return the height of the tree count from that node.","            % @para node : (avltreeNode) class object indicate which node's","            % height we want","            % @return h: (integer)indicate the height of the tree or subtree. ","            if isempty(node)","                h = 0;","                return;","            end % end if-else","            h = node.height;","            return;","        end % end function ","","        function found = search(obj, value)","            % wether we found the value","            % @return found : (boolean) whether we found the value in tree.","            found = obj.searchrecursive(obj.root, value) ;","        end","","        function found = searchrecursive(obj, node, value)","            %containrecursive check if the value of node(current) equal to","            %value. ","            %if the node is empty return false cause the traverse reach end","            %and found no match. ","            %if the node match return true;","            %if value < node.value(current) then traverse to the leftnode,","            %otherwise traverse to rightnode.","            if isempty(node) == 1 % reach the end of tree.","                %fprintf(\"not found\");","                found = false;","                return;","            end","            if value == node.value % found the value return true","                found = true;","                return;","            end","            if value < node.value % the value is smaller then node(current), then go to the rightnode","                found = obj.searchrecursive(node.leftnode, value);","                return;","            end","            found = obj.searchrecursive(node.rightnode, value);","        end % end function ","    end % end methods","end % end class"],"CoverageDisplayDataPerLine":{"Statement":[{"LineNumber":9,"Hits":4,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":13,"Hits":3,"StartColumnNumbers":12,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":14,"Hits":23,"StartColumnNumbers":16,"EndColumnNumbers":74,"ContinuedLine":false},{"LineNumber":23,"Hits":75,"StartColumnNumbers":12,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":24,"Hits":23,"StartColumnNumbers":16,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":26,"Hits":52,"StartColumnNumbers":16,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":27,"Hits":25,"StartColumnNumbers":20,"EndColumnNumbers":78,"ContinuedLine":false},{"LineNumber":28,"Hits":27,"StartColumnNumbers":16,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":29,"Hits":27,"StartColumnNumbers":20,"EndColumnNumbers":80,"ContinuedLine":false},{"LineNumber":34,"Hits":75,"StartColumnNumbers":12,"EndColumnNumbers":95,"ContinuedLine":false},{"LineNumber":37,"Hits":75,"StartColumnNumbers":12,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":41,"Hits":75,"StartColumnNumbers":12,"EndColumnNumbers":58,"ContinuedLine":false},{"LineNumber":42,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":43,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":46,"Hits":73,"StartColumnNumbers":12,"EndColumnNumbers":60,"ContinuedLine":false},{"LineNumber":47,"Hits":4,"StartColumnNumbers":16,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":48,"Hits":4,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":52,"Hits":69,"StartColumnNumbers":12,"EndColumnNumbers":58,"ContinuedLine":false},{"LineNumber":53,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":62,"ContinuedLine":false},{"LineNumber":54,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":55,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":57,"Hits":67,"StartColumnNumbers":12,"EndColumnNumbers":61,"ContinuedLine":false},{"LineNumber":58,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":59,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":60,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":62,"Hits":65,"StartColumnNumbers":12,"EndColumnNumbers":19,"ContinuedLine":false},{"LineNumber":70,"Hits":6,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":71,"Hits":6,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":74,"Hits":6,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":75,"Hits":6,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":77,"Hits":6,"StartColumnNumbers":12,"EndColumnNumbers":98,"ContinuedLine":false},{"LineNumber":78,"Hits":6,"StartColumnNumbers":12,"EndColumnNumbers":86,"ContinuedLine":false},{"LineNumber":79,"Hits":6,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":80,"Hits":6,"StartColumnNumbers":12,"EndColumnNumbers":19,"ContinuedLine":false},{"LineNumber":88,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":89,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":92,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":93,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":95,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":98,"ContinuedLine":false},{"LineNumber":96,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":86,"ContinuedLine":false},{"LineNumber":97,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":98,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":19,"ContinuedLine":false},{"LineNumber":106,"Hits":76,"StartColumnNumbers":12,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":107,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":108,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":110,"Hits":75,"StartColumnNumbers":12,"EndColumnNumbers":83,"ContinuedLine":false},{"LineNumber":111,"Hits":75,"StartColumnNumbers":12,"EndColumnNumbers":19,"ContinuedLine":false},{"LineNumber":119,"Hits":356,"StartColumnNumbers":12,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":120,"Hits":144,"StartColumnNumbers":16,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":121,"Hits":144,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":123,"Hits":212,"StartColumnNumbers":12,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":124,"Hits":212,"StartColumnNumbers":12,"EndColumnNumbers":19,"ContinuedLine":false},{"LineNumber":130,"Hits":2,"StartColumnNumbers":12,"EndColumnNumbers":58,"ContinuedLine":false},{"LineNumber":141,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":143,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":144,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":146,"Hits":7,"StartColumnNumbers":12,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":147,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":148,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":150,"Hits":6,"StartColumnNumbers":12,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":151,"Hits":4,"StartColumnNumbers":16,"EndColumnNumbers":66,"ContinuedLine":false},{"LineNumber":152,"Hits":4,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":154,"Hits":2,"StartColumnNumbers":12,"EndColumnNumbers":63,"ContinuedLine":false}],"Function":[{"LineNumber":8,"Hits":4,"StartColumnNumbers":8,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":12,"Hits":3,"StartColumnNumbers":8,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":18,"Hits":75,"StartColumnNumbers":8,"EndColumnNumbers":57,"ContinuedLine":false},{"LineNumber":65,"Hits":6,"StartColumnNumbers":8,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":83,"Hits":8,"StartColumnNumbers":8,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":101,"Hits":76,"StartColumnNumbers":8,"EndColumnNumbers":48,"ContinuedLine":false},{"LineNumber":114,"Hits":356,"StartColumnNumbers":8,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":127,"Hits":2,"StartColumnNumbers":8,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":133,"Hits":8,"StartColumnNumbers":8,"EndColumnNumbers":58,"ContinuedLine":false}]}}