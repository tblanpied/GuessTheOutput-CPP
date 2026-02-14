#include <iostream>

int main() {
    int x = 1;

    auto a = [=]() mutable {
        x++;
        return x;
    };

    auto b = [&]() {
        x++;
        return x;
    };

    std::cout << a() << x << b() << x << "\n";
}
