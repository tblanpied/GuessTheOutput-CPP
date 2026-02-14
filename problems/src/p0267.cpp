#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3, 2, 4};

    for (auto it = v.begin(); it != v.end(); ) {
        if (*it == 2) it = v.erase(it);
        else ++it;
    }

    std::cout << v.size();
    for (int x : v) std::cout << x;
    std::cout << "\n";
}
