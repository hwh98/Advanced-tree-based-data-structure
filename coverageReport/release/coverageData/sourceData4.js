var sourceData4 = {"FileName":"/Users/hongweixiang/Documents/MATLAB/COSC520-Advanced algorithm/Advanced-tree-based-algorithm/Tree_Class/redblacktree.m","RawFileContents":["classdef redblacktree <handle","    properties","        root; % root node of the red black tree","        valuearr; % the value arr to build red black tree","        TNULL; % the null node \"NIL\"","    end","    methods","        function obj = redblacktree(X) % constructor","            obj.valuearr = X;","            obj.TNULL = redblacktreeNode(); % create a null node ;","            obj.TNULL.color = 0; %initialize its color","            obj.root = obj.TNULL; % initialize a root node as null","        end % end constructor","","        function obj = arrInsertRBT(obj) % loop through the valuearr to insert them into red-black tree one at a time ","            for i = 1:length(obj.valuearr)","                obj.insert(obj.valuearr(i));","            end % end for","        end % end function ","","        function obj = insert(obj, value)","            % insert the value in red black tree","            % param value the node value","            node = redblacktreeNode(); % create node for this value","            node.data = value; ","            node.left = obj.TNULL; % left node point to NIL","            node.right = obj.TNULL; % right node to NIL","            node.color = 1; % new node must be red","","            x = obj.root; % the variable to identify the NIL(empty) location to put the inserted value","            while(x ~= obj.TNULL) % if x is not TNULL, which means root has value and is not the first node, we will find correct place to put the inserted node; ","            % otherwise, the value is the first node in RBT","                y = x; % y will become the parent of x when we found the place and escape the while loop ","                if(node.data < x.data) % compare the value with root ","                    x = x.left; % go to the left child.","                else","                    x = x.right;","                end % end if else","            end% end while","            ","            % y is parent of x and insert the node from the parent ","            if exist('y') % if y eixst, which means the node is not the root node, we need to assign the node parent","                node.parent = y; % y is the parent of x ","            end","            if ~exist('y') % if y variable doesn't exist, which means the node is the first node(didn't get into the while loop), the current node with value is the root!","                obj.root = node; % this is the first node","            elseif node.data < y.data % compare with parent node to decide insert in left or right NIL node.","                y.left = node;","            else","                y.right = node;","            end","","            if isempty(node.parent)% if new node is a root node, simple return","                node.color = 0;","                return","            end","            if isempty(node.parent.parent) %  if the grand parent is null, simply return","                % becuase the tree is still simple at this moment we don't need to change color or fix tree ","                return;","            end","            ","            obj.fixtree(node); % we need to fix the color, and rotate the","            % position in order to balanced the tree.","","        end % end function ","","        function obj = fixtree(obj, k) ","            % fix the red black tree","            % @para k: (redblacktreeNode) class object which node we want","            % to fix from.","            %reutnr obj : (redblacktreeNode) class object which is the","            %updated fixed tree node.","            while(k.parent.color == 1)","                if(k.parent == k.parent.parent.right)","                    u = k.parent.parent.left; % uncle","                    if(u.color == 1) % uncle is black","                        % case3.1","                        u.color = 0;","                        k.parent.color = 0;","                        k.parent.parent.color = 1;","                        k = k.parent.parent;","                    else","                        if k == k.parent.left","                        % case 3.2.2","                            k = k.parent;","                            obj.rightrotate(k);","                        end","","                        % case 3.2.1","                        k.parent.color = 0; % change parent color to red","                        k.parent.parent.color = 1; % change grand parent color to black","                        obj.leftrotate(k.parent.parent);","                    end % end if-else","                else","                    u = k.parent.parent.right; % uncle","                    if u.color ==1","                    % mirror case 3.1","                        u.color = 0;","                        k.parent.color = 0;","                        k.parent.parent.color = 1;","                        k = k.parent.parent;","                    else","                        if k == k.parent.right","                        %mirror case 3.2.2","                            k = k.parent;","                            obj.leftrotate(k);","                        end % end if","                        %mirror case 3.2.1","                        k.parent.color = 0;","                        k.parent.parent.color = 1;","                        obj.rightrotate(k.parent.parent);","                    end % end if-else","                end % end if-else","                if k == obj.root","                    break; % stop when we get to the root","                end % end if","            end % end while","            obj.root.color = 0;","        end % end function","","        function obj = rightrotate(obj, x)","            % the right rotation","            % @para x : (redblacktreeNode) class object which node we want","            % to perform right rotation from.","            % @return obj:  (redblacktreeNode) class object of the updated new node after we do right rotate.","            y = x.left;","            x.left = y.right;","            if(y.left ~=obj.TNULL)","                y.right.parent = x;","            end % end if ","","            y.parent = x.parent;","","            if isempty(x.parent)","                obj.root = y;","            elseif x == x.parent.right","                x.parent.right = y;","            else","                x.parent.left = y;","            end % end else-if","            y.right= x;","            x.parent= y;","        end % end function ","","        function obj = leftrotate(obj, x)","            % the left rotation","            % @para x : (redblacktreeNode) class object which node we want","            % to perform left rotation from.","            % @return obj: (redblacktreeNode) class object of the updated node after we do left rotate.","            y = x.right;","            x.right = y.left;","","            if(y.left ~= obj.TNULL)","                y.left.parent = x;","            end % end if","","            y.parent = x.parent;","            ","            if isempty(x.parent)","                obj.root = y;","            elseif x == x.parent.left","                x.parent.left = y;","            else","                x.parent.right = y;","            end % end else-if ","            y.left = x;","            x.parent = y;","        end % end function ","","","","        function found = search(obj, value)","        % search the value in red black tree","        %@param value the value we want to search","        %@return found a boolean indicate whether we found the value in rb","            found = obj.searchrecursive(obj.root, value);","        end % end function ","        ","        function found = searchrecursive(obj, node, value)","            % recursive search each node like a binary search tree.","            %@param value (int)the value we want to search","            %@param node (redblackNode) current node","            %@return found the boolean value whether we found it","            if node.data == value","                found = true;","                return;","            end % end if","            if node ==obj.TNULL % reach to end without finding the value return false","                found = false;","                return;","            end % end if ","            if value < node.data","                found = obj.searchrecursive(node.left, value);","                return;","            end % end if","            found = obj.searchrecursive(node.right, value);","        end% end function ","","","    end % end methods","end % end class"],"CoverageDisplayDataPerLine":{"Statement":[{"LineNumber":9,"Hits":3,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":10,"Hits":3,"StartColumnNumbers":12,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":11,"Hits":3,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":12,"Hits":3,"StartColumnNumbers":12,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":16,"Hits":2,"StartColumnNumbers":12,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":17,"Hits":32,"StartColumnNumbers":16,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":24,"Hits":32,"StartColumnNumbers":12,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":25,"Hits":32,"StartColumnNumbers":12,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":26,"Hits":32,"StartColumnNumbers":12,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":27,"Hits":32,"StartColumnNumbers":12,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":28,"Hits":32,"StartColumnNumbers":12,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":30,"Hits":32,"StartColumnNumbers":12,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":31,"Hits":32,"StartColumnNumbers":12,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":33,"Hits":98,"StartColumnNumbers":16,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":34,"Hits":98,"StartColumnNumbers":16,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":35,"Hits":36,"StartColumnNumbers":20,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":37,"Hits":62,"StartColumnNumbers":20,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":42,"Hits":32,"StartColumnNumbers":12,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":43,"Hits":30,"StartColumnNumbers":16,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":45,"Hits":32,"StartColumnNumbers":12,"EndColumnNumbers":26,"ContinuedLine":false},{"LineNumber":46,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":47,"Hits":30,"StartColumnNumbers":12,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":48,"Hits":12,"StartColumnNumbers":16,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":50,"Hits":18,"StartColumnNumbers":16,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":53,"Hits":32,"StartColumnNumbers":12,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":54,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":55,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":57,"Hits":30,"StartColumnNumbers":12,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":59,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":62,"Hits":28,"StartColumnNumbers":12,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":73,"Hits":28,"StartColumnNumbers":12,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":74,"Hits":28,"StartColumnNumbers":16,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":75,"Hits":18,"StartColumnNumbers":20,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":76,"Hits":18,"StartColumnNumbers":20,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":78,"Hits":8,"StartColumnNumbers":24,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":79,"Hits":8,"StartColumnNumbers":24,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":80,"Hits":8,"StartColumnNumbers":24,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":81,"Hits":8,"StartColumnNumbers":24,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":83,"Hits":10,"StartColumnNumbers":24,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":85,"Hits":2,"StartColumnNumbers":28,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":86,"Hits":2,"StartColumnNumbers":28,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":90,"Hits":10,"StartColumnNumbers":24,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":91,"Hits":10,"StartColumnNumbers":24,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":92,"Hits":10,"StartColumnNumbers":24,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":95,"Hits":10,"StartColumnNumbers":20,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":96,"Hits":10,"StartColumnNumbers":20,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":98,"Hits":4,"StartColumnNumbers":24,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":99,"Hits":4,"StartColumnNumbers":24,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":100,"Hits":4,"StartColumnNumbers":24,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":101,"Hits":4,"StartColumnNumbers":24,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":103,"Hits":6,"StartColumnNumbers":24,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":105,"Hits":2,"StartColumnNumbers":28,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":106,"Hits":2,"StartColumnNumbers":28,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":109,"Hits":6,"StartColumnNumbers":24,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":110,"Hits":6,"StartColumnNumbers":24,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":111,"Hits":6,"StartColumnNumbers":24,"EndColumnNumbers":57,"ContinuedLine":false},{"LineNumber":114,"Hits":28,"StartColumnNumbers":16,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":115,"Hits":4,"StartColumnNumbers":20,"EndColumnNumbers":26,"ContinuedLine":false},{"LineNumber":118,"Hits":28,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":126,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":127,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":128,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":129,"Hits":8,"StartColumnNumbers":16,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":132,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":134,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":135,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":136,"Hits":6,"StartColumnNumbers":12,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":137,"Hits":4,"StartColumnNumbers":16,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":139,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":141,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":142,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":24,"ContinuedLine":false},{"LineNumber":150,"Hits":12,"StartColumnNumbers":12,"EndColumnNumbers":24,"ContinuedLine":false},{"LineNumber":151,"Hits":12,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":153,"Hits":12,"StartColumnNumbers":12,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":154,"Hits":4,"StartColumnNumbers":16,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":157,"Hits":12,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":159,"Hits":12,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":160,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":161,"Hits":10,"StartColumnNumbers":12,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":162,"Hits":4,"StartColumnNumbers":16,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":164,"Hits":6,"StartColumnNumbers":16,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":166,"Hits":12,"StartColumnNumbers":12,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":167,"Hits":12,"StartColumnNumbers":12,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":176,"Hits":2,"StartColumnNumbers":12,"EndColumnNumbers":57,"ContinuedLine":false},{"LineNumber":184,"Hits":11,"StartColumnNumbers":12,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":185,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":186,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":188,"Hits":10,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":189,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":190,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":192,"Hits":9,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":193,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":62,"ContinuedLine":false},{"LineNumber":194,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":196,"Hits":8,"StartColumnNumbers":12,"EndColumnNumbers":59,"ContinuedLine":false}],"Function":[{"LineNumber":8,"Hits":3,"StartColumnNumbers":8,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":15,"Hits":2,"StartColumnNumbers":8,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":21,"Hits":32,"StartColumnNumbers":8,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":67,"Hits":28,"StartColumnNumbers":8,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":121,"Hits":8,"StartColumnNumbers":8,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":145,"Hits":12,"StartColumnNumbers":8,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":172,"Hits":2,"StartColumnNumbers":8,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":179,"Hits":11,"StartColumnNumbers":8,"EndColumnNumbers":58,"ContinuedLine":false}]}}