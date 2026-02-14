#include <iostream>
#include <initializer_list>

int main() {
    for (int x : std::initializer_list<int>{1, 2, 3}) {
        std::cout << x;
    }
    std::cout << "\n";
}
