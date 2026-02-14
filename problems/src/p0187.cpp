#include <iostream>
#include <initializer_list>

int main() {
    int i = 0;

    auto k = [&]() {
        std::cout << i;
        return i++;
    };

    std::initializer_list<int> lst{ k(), k(), k() };
    (void)lst;

    std::cout << " " << i << "\n";
}
